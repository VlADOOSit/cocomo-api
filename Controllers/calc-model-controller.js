const CalcModel = require("../Models/CalcModel");

const ApiError = require("../utils/ApiError");

class CalcModelController {
    async createCalcModel(req, res, next) {
        try {
            if (!req.body.kloc || !req.body.user_id || !req.body.project_type || !req.body.saving_type) {
                return next(ApiError.BadRequest("Check all fields"));
            }

            let calc_model = {
                user_id: req.user.id,
                kloc: req.body.kloc,
                project_type: req.body.project_type,
                saving_type: req.body.saving_type,
                rating_attr: JSON.stringify(req.body.rating_attr)
            };

            const addCalcModel = await CalcModel.addCalcModel(calc_model);

            return res.status(201).json(
                {
                    id: addCalcModel[0].insertId, 
                    ...calc_model
                });

        } catch(e) {
            next(e);
        }
    }

    async getCalcModelsListByUser(req, res, next) {
        try {
            console.log(req.user.id)
            const [getCalcModel] = await CalcModel.getListCalcModelsByUser(req.user.id);
            
            return res.status(200).json(getCalcModel);
        } catch(e) {
            next(e);
        }
    }

    async deleteCalcModelById(req, res, next) {
        try {

            const { calcModelId } = req.params;

            const deleteCalcModelById = await CalcModel.deleteCommentById(calcModelId);

            return res.status(204).json();

        } catch(e) {
            next(e);
        }
    }
    
}

module.exports = new CalcModelController();