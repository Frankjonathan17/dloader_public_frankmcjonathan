const UserModel = require('../Schemas/user')
const movieModel = require('../Schemas/movies')
const tvsModel = require('../Schemas/tv')
const showsModel = require('../Schemas/Shows')
const episodesModel = require('../Schemas/episodes')



exports.FindUserpById=(req,res,next,uid)=>{
    UserModel.find({_id:uid})
          .populate('dp')
          .exec((err,dp)=>{
              if(err || !dp){
                  return res.status(400).json({error:err,message:'failed to find song with that Id'})
              }
              req.image = dp
        
              next()
          });
}

exports.FindUserCoverpById=(req,res,next,ucid)=>{
    UserModel.find({_id:ucid})
              .populate('cover')
              .exec((err,cover)=>{
                  if(err || !cover){
                      return res.status(400).json({error:err,message:'failed to find song with that Id'})
                  }
                  req.image = cover
            
                  next()
              });
    }

exports.FindMoviepById=(req,res,next,mid)=>{
movieModel.find({_id:mid})
          .populate('dp')
          .exec((err,dp)=>{
              if(err || !dp){
                  return res.status(400).json({error:err,message:'failed to find song with that Id'})
              }
              req.image = dp
        
              next()
          });
}


exports.FindMovieCoverById=(req,res,next,cid)=>{
    movieModel.find({_id:cid})
              .populate('cover')
              .exec((err,cover)=>{
                  if(err || !cover){
                      return res.status(400).json({error:err,message:'failed to find song with that Id'})
                  }
                  req.image = cover
            
                  next()
              });
    }



    // SHOWS

    
    exports.FindShowById=(req,res,next,spid)=>{
        showsModel.find({_id:spid})
                  .populate('dp')
                  .exec((err,dp)=>{
                      if(err || !dp){
                          return res.status(400).json({error:err,message:'failed to find song with that Id'})
                      }
                      req.image = dp
                
                      next()
                  });
        }
        
        
        exports.FindShowCoverById=(req,res,next,scid)=>{
            showsModel.find({_id:scid})
                      .populate('cover')
                      .exec((err,cover)=>{
                          if(err || !cover){
                              return res.status(400).json({error:err,message:'failed to find song with that Id'})
                          }
                          req.image = cover
                    
                          next()
                      });
            }
        

    // SEASONS
    
    
exports.FindShowSeasonById=(req,res,next,sepid)=>{
    tvsModel.find({_id:sepid})
              .populate('dp')
              .exec((err,dp)=>{
                  if(err || !dp){
                      return res.status(400).json({error:err,message:'failed to find song with that Id'})
                  }
                  req.image = dp
            
                  next()
              });
    }
    
    
    exports.FindShowSeasonCoverById=(req,res,next,secid)=>{
        tvsModel.find({_id:secid})
                  .populate('cover')
                  .exec((err,cover)=>{
                      if(err || !cover){
                          return res.status(400).json({error:err,message:'failed to find cover image with that Id'})
                      }
                      req.image = cover
                
                      next()
                  });
        }
    
    
        exports.FindShowSeasonEpisodeCoverById=async(req,res,next,seecid)=>{
           
            episodesModel.find({_id:seecid})
                  .populate('cover')
                  .exec((err,cover)=>{
                      if(err || !cover){
                          return res.status(400).json({error:err,message:'failed to find cover image with that Id'})
                      }
                      req.image = cover
                
                      next()
                  });
       
            }
        
        
