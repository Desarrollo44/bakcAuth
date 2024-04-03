

function postUser(req,res){
    let ids=3;
    try {
        const{username,password}=req.body;
        const user={
            id:ids+1,
            name:username,
            userPass:password,
            rol:"1"
        }
        console.table(user);
        res.status(200).send('Obj captured successfully!');
    } catch (error) {
        res.status(500).json({message:'Error interno del servidor'});
    }
}

module.exports={
    postUser
}