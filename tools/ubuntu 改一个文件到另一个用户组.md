你可以使用 `chown` 命令来更改文件的所有者（用户）和用户组。同时，你也可以使用 `chgrp` 命令专门用于更改文件的用户组。

以下是两种方法，一种使用 `chown`，另一种使用 `chgrp`：

1. 使用 `chown` 更改用户和用户组：

   ```bash
   sudo chown newuser:newgroup /path/to/your/file
   ```

   将 `newuser` 替换为新的用户，将 `newgroup` 替换为新的用户组，以及将 `/path/to/your/file` 替换为要更改的文件的路径。

2. 使用 `chgrp` 更改用户组：

   ```bash
   sudo chgrp newgroup /path/to/your/file
   ```

   将 `newgroup` 替换为新的用户组，以及将 `/path/to/your/file` 替换为要更改的文件的路径。

请确保你有足够的权限执行这些操作。如果不是文件的所有者，你可能需要使用 `sudo`。
