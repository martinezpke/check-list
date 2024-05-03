export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.redirect('/sign-in');
        } else {
            res.clearCookie('token'); // Utiliza res.clearCookie para eliminar la cookie
            res.redirect('/sign-in');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default logout;