
export default (req,res) => {
    try {
        res.status(201).json({Response: `Successfully responded ${new Date().toLocaleDateString('el_GR')}`}); //Server's Response in case of success
    } catch (err) {
        res.status(501).json({Error: `501 ${err.message}`}); //Server's Response in case of failure
    }
}