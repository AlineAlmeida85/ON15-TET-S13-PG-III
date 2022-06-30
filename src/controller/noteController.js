const NoteSchema = require("../models/noteSchema")

const getAll = async (req, res) => {
    try {
        const allNotes = await NoteSchema.find()
        res.status(200).send(allNotes)
    } catch (err) {
        console.log(err)
    }
};

const createNote = async (req, res) => {        
    try {
        if(!req.body.author || !req.body.title) {
            res.status(404).send({
                "message": "Os campos obrigatórios precisam ser enviados",
                "statusCode": 404
            })
        }
        const newNote = new NoteSchema({
            // _id: new mongoose.Schema.Types.ObjectId,
            author: req.body.author,
            title: req.body.title,
            createdAt: new Date()
        })
        console.log("NOVA NOTA", newNote);

        const savedNote = await newNote.save();

        if(savedNote){
        res.status(201).send({
            "message": "Nota criada com Suceso!",
            savedNote
            })
        }

    } catch(err) {
        console.log(err);
    }
    
}

const updateNote = async (req, res) => {
    try{
        // atualizar o documento a partir do id
        // receber esse is da requisição
        // encontrar o documento que possui aquele id

        const findNote = await NoteSchema.findById(req.params.id)

        if(!findNote) {
            res.status(404).send({
                "message": "Nota não encontrada!",
                "statusCode": 404
            })
        }
        // confiro as informações atualizadas        
        findNote.author = req.body.author || findNote.author
        
        findNote.title = req.body.title || findNote.author
        // salvo as atualizações

        console.log("Nota Atualizada", findNote)
        const savedNote = await findNote.save()
        // envio a resposta
        res.status(200).send({
            "message": "Nota Atualizada com Sucesso!",
            findNote
        })


    } catch(err) {
        console.log(err);
    }
}

const deleteNote = async (req, res) => {
    try {
    // acessar o documento a ser deletado
    const findNote = await NoteSchema.findById(req.params.id)
    // deletar o documento
    await findNote.delete()

    res.status(200).send({
        "message": "Nota deletada com sucesso!",
        findNote
    })
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    getAll,
    createNote,
    updateNote,
    deleteNote
}