const express=require("express");
const db=require("../databasevariables/conn");



const results={

// Create Employee

create: async (req,res)=>{
        const {name, email, phone_no} = req.body;
        var sql = "INSERT INTO employees(name, email, phone_no) VALUES ?";
        var values = [
            [name, email, phone_no]
        ];
    
            db.query(sql, [values], function(error,result){
                if(error) throw error;
                res.status(200).json({
                    success:true,
                    msg:"Employee detail recorded Successfully"
                });
            })

},

//Get employee details without pagination 

get: async(req,res)=>{
  var sql = "select * from employees";
        db.query(sql,function(error,result){
            if(error) console.log(error);
            else{
               res.send(result);
            }
        })
},

//List employee details with pagination

getPage: async(req,res)=>{
    try{
        const { page, limit} = req.query;
        const offset = (page-1) * limit
        // console.log(page,limit)
        const [data] = await db.query('select * from employees limit ? offset ?', [+limit, +offset])
        const [totalPageData] = await db.query('select count(*) as count from employees')
        const totalPage = Math.ceil(+totalPageData[0]?.count / limit)
        console.log(totalPage)
        // console.log(data)

        res.json({
            data:data,
            pagination:  {
                page: +page,
                limit: +limit,
                totalPage
            }
        })
    }catch(err){
        console.log(err);
    }
},

//Get employee details by id

findById: async(req,res)=>{
    var sql = "select * from employees where id=?";
        db.query(sql,[req.params.id],function(error,result){
            if(error) console.log(error);
            else{
               res.send(result);
            }
        })
},

//Update Employee

update_patch: async(req,res)=>{
    var emp = req.body;
    var sql ="update employees set ? where id="+emp.id;
    db.query(sql, [emp], (err,result)=>{
        if(err) throw err;
        res.status(200).json({
            success:true,
            msg:"Employee detail updated Successfully"
        });
    })
},

update_put: async(req,res)=>{
    var emp = req.body;
    var sql ="update employees set ? where id="+emp.id;
    db.query(sql, [emp], (err,result)=>{
        if(err) throw err;
        else{
            if(result.affectedRows==0){
                const {name, email, phone_no} = req.body;
                var sql = "INSERT INTO employees(name, email, phone_no) VALUES ?";
                var values = [
                    [name, email, phone_no]
                ];
            
                db.query(sql, [values], function(error,result){
                    if(error) throw error;
                    res.status(200).json({
                        success:true,
                        msg:"Employee detail updated Successfully"
                    });
                })
            }else{
                res.send(result)
            }
        }
    })
},

//Delete Employee

delete: async(req,res)=>{
    var sql = "DELETE FROM employees WHERE id= ?";
    db.query(sql,[req.params.id] ,function(error,result){
        if(error) console.log(error);
        res.status(200).json({
            success:true,
            msg:"Employee detail deleted Successfully"
        });
    })

}
}

module.exports = results;