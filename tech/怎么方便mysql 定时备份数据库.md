在命令行中，为了安全起见，通常不建议直接将密码明文写在命令中，因为其他人可能能够看到这个命令并获取密码信息。

然而，你可以使用 `--password` 或 `-p` 选项来在命令行中输入密码，而无需在命令本身中明文写出密码。执行命令时，系统会要求你输入密码。

以下是一个示例：

```bash
mysqldump -u username -p database_name > /path/to/backup.sql
```

在执行此命令时，系统会提示你输入密码。输入密码时，命令行不会显示任何字符，以确保密码的安全性。

另一种方式是使用 `--defaults-extra-file` 选项，将密码保存在一个单独的文件中，并在命令行中引用该文件。这种方法可以提供更好的安全性，因为你可以限制该文件的访问权限。以下是示例：

1. 创建一个名为 `my.cnf` 的文件，并将以下内容添加到该文件中：
```
[client]
user=username
password=your_password
```

将 `username` 替换为你的 MySQL 用户名，`your_password` 替换为你的 MySQL 密码。

2. 设置 `my.cnf` 文件的权限，以确保只有你有读取权限：
```bash
chmod 600 my.cnf
```

3. 在备份命令中使用 `--defaults-extra-file` 选项，引用 `my.cnf` 文件：
```bash
mysqldump --defaults-extra-file=my.cnf database_name > /path/to/backup.sql
```

这种方式可以保护你的密码，并限制了对密码文件的访问权限。

无论使用哪种方法，请确保在使用完备份命令后，删除或妥善保管包含密码的文件，以确保密码的安全性。
