var express = require('express');
const query=require('../db/mysql_query')
var router = express.Router();

router.get('/',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        //console.log(req.sessionID)
        query.getBoardList()
        .then((queryRes)=>{
            res.render('board_list',{board_list:queryRes})
        })
    }
})

router.get('/view/:no',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const number=req.params.no
        query.detailViewBoard(number)
        .then((queryRes)=>{
            res.render('board_view',{info:queryRes})
        })
    }
})

router.get('/write',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        res.render('board_write',{username:req.session.user.id})
    }
})

router.post('/write',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const {name,title,context}=req.body //req.body 의 key값과 변수의 이름이 동일해야 함
        query.createBoard(name,title,context)
        .then((queryRes)=>{
            res.json(queryRes)
        })
        //res.json({name,title,context})
    }
})

router.get('/mod/:no',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const number=req.params.no
        query.detailViewBoard(number)
        .then((queryRes)=>{
            res.render('board_mod',{info:queryRes})
        })
    }
})

router.post('/mod/:no',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const number=req.params.no
        const {name,title,context}=req.body
        query.updateBoard(number,name,title,context)
        .then((queryRes)=>{
            res.redirect(`/board/view/${number}`)
        })
    }
})

router.get('/del/:no',(req,res)=>{
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const number=req.params.no
        query.deleteBoard(number)
        .then((queryRes)=>{
            res.redirect('/board')
        })
    }
})

module.exports = router;