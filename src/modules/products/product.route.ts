import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router.post('/', productController.createBook);
router.get('/', productController.getAllBooks);
router.get('/:productId', productController.getBookById);
router.put('/:productId', productController.updateBook);
router.delete('/:productId', productController.deleteBook);

export  const BookRoutes = router;
