echo "Creating user and creating db"
sudo mysql < ./sql/initial_db.sql
echo "users table created"
mysql --password=password --user=vkharkivsk < ./sql/users.sql
echo "calc_models table created"
mysql --password=password --user=vkharkivsk < ./sql/calc_models.sql