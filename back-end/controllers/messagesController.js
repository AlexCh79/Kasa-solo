const { listConversations, findOrCreateConversation, listMessages, sendMessage } = require('../services/messagesService');

function statusFromError(e) {
  if (e && e.status) return e.status;
  return 500;
}

/**
 * Convertit un identifiant reçu (URL ou body) en nombre entier
 * @returns l'identifiant, ou null s'il n'est pas valide
 */
function toId(value) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

/**
 * Liste des conversations
 */
async function list(req, res) {
    const db = req.app.locals.db;
    try {
        const conversations = await listConversations(db, req.user.id);
        res.status(200).json(conversations);
    } catch (e) {
        res.status(statusFromError(e)).json({ error: e.message });
    }
}

/**
 * Récupèration ou création d'une conversation
 */
async function create(req, res) {
    const db = req.app.locals.db;
    try{
        const body = req.body || {};
        const hostId = toId(body.host_id);
        if(!hostId) return res.status(400).json({ error: 'host_id is required' });
        const conversation = await findOrCreateConversation(db, req.user.id, hostId);
        res.status(200).json(conversation);
    } catch (e) {
        res.status(statusFromError(e)).json({ error: e.message });
    }
}

/**
 * Récupération des messages d'une conversation
 */
async function messages(req, res) {
    const db = req.app.locals.db;
    try {
        const conversationId = toId(req.params.id);
        if(!conversationId) return res.status(400).json({ error: 'invalid conversation id' });
        const list = await listMessages(db, conversationId, req.user.id);
        res.status(200).json(list);
    } catch (e) {
        res.status(statusFromError(e)).json({ error: e.message });
    }
}

/**
 * Envoi d'un nouveau message
 */
async function send(req, res){
    const db = req.app.locals.db;
    try {
        const conversationId  = toId(req.params.id);
        if(!conversationId) return res.status(400).json({ error: 'invalid conversation id' });
        const body = req.body || {};
        const message = await sendMessage(db, conversationId, req.user.id, body.content);
        res.status(201).json(message);
    } catch (e) {
        res.status(statusFromError(e)).json({ error: e.message });
    }
}

module.exports = { list, create, messages, send };