import {
     getAllService, getOneService,createService,removeService
  } from './service.js';


export async function getAll(req, res, next) {
      try {
         
      const geted =  await getAllService();
      return res.send(geted);
      } catch (err) {
    //    return next(err);
     }
  }
  export async function getOne(req, res, next) {
    try {
      const { params } = req;
      const geted =  await getOneService(params);
      return res.send(geted);
    } catch (err) {
      return next(err);
    }
  }
  export async function create(req, res, next) {
    try {
      const { body } = req;
      const creted = await createService(body);
      return res.send(JSON.stringify(creted));
    } catch (err) {
      return next(err);
    }
  }
  export function remove(req, res, next) {
    try {
      const { params,body } = req;
      const removed = removeService(params,body);
      return res.send(JSON.stringify(removed));
    } catch (err) {
      return next(err);
    }
  }
  export function update(req, res, next) {
    try {
      const { params, body } = req;
      const updaed = updateService(params, body);
      return res.send(JSON.stringify(updaed));
    } catch (err) {
      return next(err);
    }
  }