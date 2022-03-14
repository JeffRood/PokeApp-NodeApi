import app from "./app";
import './Data/databases'


app.listen(app.get('port'));

console.log(`Server on port ${app.get('port')}`);
