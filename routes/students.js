const express = require("express");
const router = express.Router();

const students = require("../data");

/**
 * @swagger
 * definitions:
 *   Student:
 *     properties:
 *       FIO:
 *         type: string
 *       birth:
 *         type: date
 *       mark:
 *         type: integer
 */


/**
 * @swagger
 * /api/students:
 *   get:
 *     tags:
 *       - Students
 *     description: Returns all students
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of students
 *         schema:
 *           $ref: '#/definitions/Students'
 */


router.get("/", function (req, res) {
    console.log(students)
	res.status(200).json(students);
});


 /**
  * @swagger
  * /api/students/:
  *   post:
 *     tags:
 *       - Students
 *     description: Creates a new student
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: student
 *         description: Student object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Student'
 *     responses:
 *       201:
 *         description: Successfully created
  */

router.post("/", function (req, res) {
	const { FIO, birth, mark } = req.body;

	let student = {
		id: students.length + 1,
		FIO,
		birth,
		 mark
	};

	students.push(student);

	res.status(201).json(student);
});

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     tags:
 *       - Students
 *     description: Updates a single student
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: Student's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: student
 *         in: body
 *         description: Fields for the student resource
 *         schema:
*          type: array
*          $ref: '#/definitions/Student'
 *     responses:
 *       204:
 *         description: Successfully updated
 */

router.put("/:id", function (req, res) {
	let student = students.find(function (item) {
		return item.id == req.params.id;
    });
    console.log(student)

	if (student) {
		const { FIO, birth, mark } = req.body;

		let updated = {
			id: student.id,
			FIO: FIO !== undefined ? FIO : student.FIO,
			birth: birth !== undefined ? birth : student.birth,
			mark: mark !== undefined ? mark : student.mark
		};

		students.splice(students.indexOf(student), 1, updated);

		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     tags:
 *       - Students
 *     description: Deletes a single student
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Student's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted
 */

router.delete("/:id", function (req, res) {
	let student = students.find(function (item) {
		return item.id == req.params.id;
	});

	if (student) {
		students.splice(students.indexOf(student), 1);
	} else {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
});

module.exports = router;