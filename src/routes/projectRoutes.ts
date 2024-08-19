import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/taks";

const router = Router()

router.post('/',
    body('projectName')
    .notEmpty().withMessage('El nombre del Proyecto es obligatorio'),
    body('clientName')
    .notEmpty().withMessage('El nombre del Cliente es obligatorio'),
    body('description')
    .notEmpty().withMessage('La Descripcion del Proyecto es obligatoria'),
 handleInputErrors,
 ProjectController.createProject
)

router.get('/', ProjectController.getAllProjects)

router.get('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.getProjectById
)

router.put('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    body('projectName')
    .notEmpty().withMessage('El nombre del Proyecto es obligatorio'),
    body('clientName')
    .notEmpty().withMessage('El nombre del Cliente es obligatorio'),
    body('description')
    .notEmpty().withMessage('La Descripcion del Proyecto es obligatoria'),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.deleteProject
)

// Routes for Tasks'
router.param('projectId', projectExists)

router.post('/:projectId/tasks',
    body('name')
    .notEmpty().withMessage('El nombre del Proyecto es obligatorio'),
    body('description')
    .notEmpty().withMessage('La Descripcion del Proyecto es obligatoria'),
    TaskController.createTask  
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.getTasksById
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('name')
    .notEmpty().withMessage('El nombre del Proyecto es obligatorio'),
    body('description')
    .notEmpty().withMessage('La Descripcion del Proyecto es obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('status')
     .notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
)

export default router 