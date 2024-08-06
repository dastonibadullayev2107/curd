const express = require("express");
const router = express.Router();
const users = require("../users.json");
const { v4: uuidv4 } = require("uuid")

// Hamma userlarni olish
router.get("/", (req, res) => {
    res.status(200).json({
        message: "OK",
        users
    });
})

// Bir dona userni olish id bilan
router.get("/:id", (req, res) => {  
    const id = req.params.id;

    const user = users.find(user => user.id === id);

    if (!user) {
        res.status(404).json({
            error: "User not found!"
        });
    }

    res.status(200).json({
        message: "OK",
        user
    });
})


// User yaratish
router.post("/", (req, res) => {
    const body = req.body;
    const newUser = {
        id: uuidv4(),
        ...body
    }

    users.push(newUser)

    res.status(200).json({
        message: "New user added",
        newUser
    })
})

// User yangilash
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        res.status(404).json({
            error: "User not found!"
        })
    }

    users[userIndex] = {
        ...users[userIndex],
        ...body
    }

    res.status(200).json({
        message: "Yangilandi",
        user: users[userIndex]
    })
})

// User o'chirish
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        res.status(404).json({
            error: "User not found!"
        })
    }

    users.splice(userIndex, 1);

    res.status(200).json({
        message: "O'chirildi"
    })
})

module.exports = router;