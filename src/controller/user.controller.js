
function postUser(req,res){
    try {
        const{username,password}=req.body;
        console.log('Captured obj: nombre: ', username,' contraseña: ',password);
        res.status(200).send('Obj captured successfully!');
    } catch (error) {
        res.status(500).json({message:'Error interno del servidor'});
    }
}

module.exports={
    postUser
}