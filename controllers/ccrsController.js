const express = require('express');
const db = require('../models/database');
const router = express.Router();
const pgp = require("pg-promise")({});

const usuario = "seu_usuario";
const senha = "sua_senha";
const host = "ip_do_server_postgresql";
const porta = "porta_do_server_postgresql";
const banco_de_dados = "nome_do_banco_do_seu_app";
// const db = pgp(`postgres://${usuario}:${senha}@${host}:${porta}/${banco_de_dados}`);

// await db.none(
//     "INSERT INTO clientes (nome, email) VALUES ($1, $2);",
//     [clienteNome, clienteEmail]
// );

// const clientes = await db.any("SELECT * FROM clientes;");

// const clientes = await db.all("SELECT * FROM clientes;");

// const clientes = await db.one(
//     "SELECT id, nome, email FROM clientes WHERE id = $1;",
//     clienteId
// );

// CRIAR CCR (POST)
router.post("/", (req, res) => {
    const novoCCR = req.body;
    db.ccrs.push(novoCCR);
    res.send("CCR adicionado com sucesso!");
});

// LER TUDO CCRs (GET)
router.get("/", (req, res) => {
    res.json(db.ccrs);
});

// LER 1 CCR (GET)
router.get("/:id", (req, res) => {
    const ccrId = req.params.id;
    const ccr = db.ccrs.find(ccr => ccr.id === ccrId);
    if (ccr) {
        res.json(ccr);
    } else {
        res.status(404).send("CCR não encontrado.");
    }
});

// ALTERAR CCR (PUT)
router.put("/:id", (req, res) => {
    const ccrId = req.params.id;
    const updatedCCR = req.body;
    const index = db.ccrs.findIndex(ccr => ccr.id === ccrId);
    if (index !== -1) {
        db.ccrs[index] = updatedCCR;
        res.send("CCR atualizado com sucesso!");
    } else {
        res.status(404).send("CCR não encontrado.");
    }
});

// APAGAR CCR (DELETE)
router.delete("/:id", (req, res) => {
    const ccrId = req.params.id;
    const index = db.ccrs.findIndex(ccr => ccr.id === ccrId);
    if (index !== -1) {
        db.ccrs.splice(index, 1);
        res.send("CCR removido com sucesso!");
    } else {
        res.status(404).send("CCR não encontrado.");
    }
});

module.exports = router;
