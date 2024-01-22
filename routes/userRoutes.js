const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
// const emailService = require('../services/emailService')

router.use(authMiddleware.checkUserRole)

router.get('/allUser', userController.getAllUsers)
router.get('/getUser/:id', userController.getUserById)
router.post('/addUser', userController.createUser)
router.post('/loginUser', userController.login)
router.delete('/deleteUser/:id', userController.deleteUser)

// router.post('/send-email', async (req, res) => {
//     const { toEmail, ticketInfo } = req.body

//     try {
//         await emailService.sendTicketEmail(toEmail, ticketInfo)
//         res.status(200).json({ message: 'Email sent successfully' })
//     } catch (error) {
//         console.error('Error sending email:', error)
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// })

module.exports = router;