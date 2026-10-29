with open('server.ts', 'r') as f:
    c = f.read()

import_target = 'import { registerInstituteRoutes, seedInstituteData } from "./server/instituteRoutes.js";'
import_replacement = import_target + '\nimport { registerSecretariatRoutes } from "./server/secretariatRoutes.js";'

call_target = 'registerInstituteRoutes(app, editorOrAdminMiddleware, adminMiddleware);'
call_replacement = call_target + '\n  registerSecretariatRoutes(app, editorOrAdminMiddleware, adminMiddleware);'

if import_target in c and call_target in c:
    c = c.replace(import_target, import_replacement, 1)
    c = c.replace(call_target, call_replacement, 1)
    with open('server.ts', 'w') as f:
        f.write(c)
    print("Successfully patched server.ts")
else:
    print("Targets not found in server.ts")
