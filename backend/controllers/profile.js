// controllers/userController.js
import User from '../models/user.js';

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Set by auth middleware
        const { name, email, isSeller } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, isSeller },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({
            success: true,
            data: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isSeller: updatedUser.isSeller,
            },
        });
    } catch (error) {
        console.error('Update profile error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
};

export default updateProfile;
