import colors from 'colors';
import server from './server';

const port = process.env.PORT || 4000;
server.listen(4000, () => {
  console.log(colors.cyan.bold(`Server is running on port ${port}`));
});
