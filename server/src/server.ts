import app from './app';
import logger from './utils/logger';
import { PORT } from './const';

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
