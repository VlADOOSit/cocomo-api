const db = require('../db/db');

class CalcModel {
    addCalcModel(calcModel) {
        return db.query('INSERT INTO calc_models SET ?', calcModel);
    }

    getCalcModelById(calc_model_id) {
        return db.query('SELECT * FROM calc_models WHERE id = ?', calc_model_id);
    }

    getListCalcModelsByUser(user_id) {
        return db.query('SELECT * FROM calc_models WHERE user_id = ?', user_id);
    }
    
    deleteCommentById(calc_model_id) {
        return db.query('DELETE FROM calc_models WHERE id = ?', calc_model_id);
    }


}

module.exports = new CalcModel();