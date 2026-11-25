/**
 * Crée une erreur portant un statut HTTP
 */
function httpError(message, status){
    const err = new Error(message);
    err.status = status;
    return err;
}

// 2000 caractères max. pour les messages
const MAX_MESSAGE_LENGTH = 2000;

/**
 * Récupère une conversation et vérifie que l'utilisateur y participe
 * @throws 404 si la conversation n'existe pas, 403 si l'utilisateur n'y participe pas
 */
async function getConversationForUser(db, conversationId, userId) {
    const conversation = await db.getAsync(
        'SELECT * FROM conversations WHERE id = ?', [conversationId]
    );

    if(!conversation) throw httpError('Conversation not found', 404);

    if(conversation.guest_id !== userId && conversation.host_id !== userId) {
        throw httpError('forbidden access', 403);
    }

    return conversation;
}

/**
 * Liste des conversations de l'utilisateur, de la plus récente à la plus ancienne
 */
async function listConversations(db, userId){
    const rows = await db.allAsync(`
        SELECT c.id, c.updated_at,
                u.id AS other_id, u.name AS other_name, u.picture AS other_picture,
                (SELECT m.content FROM messages m
                WHERE m.conversation_id = c.id
                ORDER BY m.created_at DESC, m.id DESC LIMIT 1) AS last_message,
                (SELECT COUNT(*) FROM messages m
                WHERE m.conversation_id = c.id AND m.sender_id <> ? AND m.read_at IS NULL)
        AS unread_count
            FROM conversations c
            JOIN users u ON u.id = CASE WHEN c.guest_id = ? THEN c.host_id ELSE c.guest_id END
            WHERE c.guest_id = ? OR c.host_id = ?
            ORDER BY c.updated_at DESC, c.id DESC
        `, [userId, userId, userId, userId]);

    return rows.map(r => ({
        id: r.id,
        updated_at: r.updated_at,
        last_message: r.last_message,
        unread_count: r.unread_count,
        other_user: {id: r.other_id, name: r.other_name, picture: r.other_picture},
    }));
}

/**
 * Récupère la conversation entre l'utilisateur et son interlocuteur ou en crée une nouvelle si elle n'existe pas
 */
async function findOrCreateConversation(db, guestId, hostId) {
    if(!hostId) throw httpError('host_id is required', 400);
    if(guestId === hostId) throw httpError('cannot start a conversation with yourself', 400);

    const host = await db.getAsync('SELECT id FROM users WHERE id = ?', [hostId]);
    if(!host) throw httpError('User not found', 404);

    const existing = await db.getAsync(`
        SELECT * FROM conversations
        WHERE (guest_id = ? AND host_id = ?) OR (guest_id = ? AND host_id = ?)
    `, [guestId, hostId, hostId, guestId]);
    if (existing) return { id: existing.id };

    const result = await db.runAsync(
        'INSERT INTO conversations(guest_id, host_id) VALUES (?, ?)',
        [guestId, hostId]
    );
    return { id: result.lastID };
}

/**
 * Liste les messages d'une conversation, du plus ancien au plus récent et marque comme lus les messages reçus par l'utilisateur
 */
async function listMessages(db, conversationId, userId) {
    await getConversationForUser(db, conversationId, userId);
    await db.runAsync(`
        UPDATE messages SET read_at = CURRENT_TIMESTAMP
        WHERE conversation_id = ? AND sender_id <> ? AND read_at IS NULL
    `, [conversationId, userId]);

    const rows = await db.allAsync(`
        SELECT *
        FROM messages
        WHERE conversation_id = ?
        ORDER BY created_at ASC, id ASC
    `, [conversationId]);

    return rows;
}

/**
 * Ajoute un nouveau message à une conversation
 */
async function sendMessage(db, conversationId, userId, content) {
    await getConversationForUser(db, conversationId, userId);
    const text = typeof content === 'string' ? content.trim() : '';
    if(!text) throw httpError('content is required', 400);
    if(text.length > MAX_MESSAGE_LENGTH) throw httpError('content is too long', 400);

    const result = await db.runAsync(
        'INSERT INTO messages(conversation_id, sender_id, content) VALUES (?, ?, ?)',
        [conversationId, userId, text]
    );
    await db.runAsync(
        'UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [conversationId]
    );

    return db.getAsync(
        'SELECT * FROM messages WHERE id = ?', [result.lastID]
    );
}

module.exports = {
    listConversations,
    findOrCreateConversation,
    listMessages,
    sendMessage,
};