import { httpStatus } from '../../utils/httpStatus'
import { pool } from '../../config/mysqlconnect'
const baby = {}

baby.list = async (req, res) => {
  const babies = await pool.query("SELECT * FROM baby")
  res.status(httpStatus.OK).json({ message: 'baby-list-success', babies })
}

baby.one = async (req, res) => {
  const { id } = req.query
  let message = 'baby-not-found'
  let status = httpStatus.BAD_REQUEST
  let newBaby = {}

  if (id) {
    const [ row ] = await pool.query(`SELECT * FROM baby WHERE id = '${id}'`)
    if (row?.id) {
      message = 'baby-success'
      status = httpStatus.OK
      newBaby = row
    }
  }
  res.status(status).json({ message, baby: newBaby })
}

baby.create = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
  } = req.body
  let status = httpStatus.BAD_REQUEST
  let message = 'baby-create-failed'
  const query = await pool.query(`INSERT INTO baby (id, first_name, middle_name, last_name) VALUES (UUID(), '${first_name}','${middle_name}','${last_name}')`)
  if (query.rowsAffected) {
    status = httpStatus.OK
    message = 'baby-create-success'
  }
  res.status(httpStatus.OK).json({ message: 'baby-created' })
}

baby.update = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
  } = req.body
  const { id } = req.query
  let message = 'baby-update-fail'
  let status = httpStatus.BAD_REQUEST
  const query = await pool.query(`UPDATE baby SET (id, first_name, middle_name, last_name) VALUES (UUID(),'${first_name}','${middle_name}','${last_name}') WHERE id = '${id}'`)
  if (query.rowsAffected) {
    message = 'baby-update-success'
    status = httpStatus.OK
  }
  res.status(status).json({ message })
}

baby.remove = async (req, res) => {
  const { id } = req.body
  let message = 'baby-remove-fail'
  let status = httpStatus.BAD_REQUEST
  const query = await pool.query(`DELETE FROM baby WHERE id = '${id}'`)
  if (query.affectedRows) {
    message = 'baby-remove-success'
    status = httpStatus.OK
  }
  const list = await pool.query("SELECT * FROM baby")
  res.status(status).json({ message, list })
}

export { baby }
