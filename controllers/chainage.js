
const axios = require('axios');
const db = require('../config/db.js');
const env = require('../config/env.js');
const Chainage = db.chainage;
axios.defaults.headers.common = {'Authorization': `Bearer ${env.iAuditor.key}`}
module.exports.findAll = async function (req, res, next) {
    try {
        Chainage.findAll({}).then(function (items) {
            let data = {
                success: true,
                data: items
            }
            res.status(200).json(data);
            next();
        })
    } catch (error) {
        res.status(401).json({ success: false, error: error })
    }
}
module.exports.readDataFromIAuditor = async function( req, res, next){
    const httpRes = res;
    axios.get(`${env.iAuditor.url}/audits/search?template=${env.iAuditor.template}`)
        .then(function(res){
            const audits = res.data.audits;
            let items = [];
            let promises = [];
            audits.forEach((audit) => {
                promises.push(axios.get(`${env.iAuditor.url}/audits/${audit.audit_id}`).then(function(res){
                    if(res.data.audit_data.score_percentage == 100){
                        const item={
                            uid: res.data.items[0].item_id,
                            chainage_start: res.data?.items[1].responses?.text,
                            chainage_end: res.data?.items[2].responses?.text,
                            work_type: res.data?.items[3].responses?.selected[0]?.label,
                            line: res.data.items[4].responses?.selected[0]?.label,
                            side: res.data.items[5].responses?.selected[0]?.label,
                            description: res.data?.items[6].responses?.text,
                            asset_id: res.data?.items[7].responses?.selected[0]?.label,
                            createdAt: res.data?.items[8].responses?.datetime,
                            updatedAt: res.data?.items[9].responses?.datetime
                        }
                        items.push(item);
                    }
                }));
            });
            Promise.all(promises).then(()=>{
                let data = {
                    success: true,
                    data: items
                }
                httpRes.status(200).json(data);
                next();
            })
        })
        .catch(function(err){
            console.log("error----->", err);
        })
    try{

    } catch (error){
        res.status(401).json({ success: false, error: error })
    }
}