const Job = require("../models/Job");
const {BadRequestError,UnauthorizedError, NotFoundError} = require("../errors/index");

const getAllJobs = async (req,res)=>{
    const jobs = await Job.find({createdBy: req.user.userId}).sort("createdAt")
    res.status(200).json({count:jobs.length,jobs})
}

const getJob = async (req,res)=>{
    const {userId} = req.user
    const jobId = req.params.id
    const job = await Job.findOne({_id: jobId, createdBy: userId})
    if(!job){
        throw new NotFoundError(`No job found with id ${jobId}`)
    }
    res.status(200).json(job)
}

const createJob = async (req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(201).json(job)
}

const updateJob = async (req,res)=>{
    const {userId} = req.user
    const jobId = req.params.id
    const {company,position} = req.body

    if(company==="" || position===""){
        throw new BadRequestError("company and position are required")
    }

    const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId},req.body,{new:true,runValidators:true})

    if(!job){
        throw new NotFoundError(`No job found with id ${jobId}`)
    }

    res.status(200).json(job)
}

const deleteJob = async (req,res)=>{
    const {userId} = req.user
    const jobId = req.params.id

    const job = await Job.findOneAndRemove({_id: jobId, createdBy: userId})

    if(!job){
        throw new NotFoundError(`No job found with id ${jobId}`)
    }

    res.status(200).json({removedJob:job})
}

module.exports = {getAllJobs, createJob,updateJob,deleteJob,getJob}