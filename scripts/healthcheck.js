
exports.addHealthCheck=(app)=>{

    app.route('/health')
        .get((req, resp)=>resp.json({message: "I'm Alive"}))
        .put((req,resp)=>resp.json({message: "I'm Alive"}));

};

