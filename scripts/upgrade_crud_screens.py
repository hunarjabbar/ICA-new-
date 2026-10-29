import re

files_to_upgrade = [
    'src/pages/secretariat/SecretariatContentCrud.tsx',
    'src/pages/secretariat/SecretariatInitiativesCrud.tsx',
    'src/pages/secretariat/SecretariatMediaCrud.tsx',
    'src/pages/secretariat/SecretariatNewsletterCrud.tsx',
    'src/pages/secretariat/SecretariatFormsCrud.tsx',
    'src/pages/secretariat/SecretariatUsersCrud.tsx',
    'src/pages/secretariat/SecretariatAuditCrud.tsx',
    'src/pages/secretariat/SecretariatSettings.tsx'
]

for file_path in files_to_upgrade:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # 1. Update max-w-6xl to w-full max-w-7xl
    content = content.replace('max-w-6xl mx-auto', 'w-full max-w-7xl mx-auto')
    
    # 2. Wrap tables with overflow-x-auto min-w-0 and add min-w-[640px] to table
    table_pattern = r'(<div className="bg-white rounded-2xl border border-\[#E5E7EB\]) overflow-hidden shadow-xs">\s*(<table className="w-full text-xs text-start">)'
    table_replacement = r'\1 shadow-xs overflow-hidden">\n        <div className="overflow-x-auto min-w-0">\n          <table className="w-full text-xs text-start min-w-[640px]">'
    
    if re.search(table_pattern, content):
        content = re.sub(table_pattern, table_replacement, content)
        # Close the div before the closing table div
        # Find </table>\s*</div> and replace with </table>\n        </div>\n      </div>
        content = re.sub(r'(</table>\s*)(</div>)', r'\1</div>\n      \2', content)
        print(f"Wrapped table in {file_path}")

    # 3. Touch target upgrades on action buttons
    content = content.replace('p-1.5 rounded-lg border border-[#E5E7EB]', 'p-2 rounded-lg border border-[#E5E7EB] min-h-[44px] min-w-[44px] inline-flex items-center justify-center')
    content = content.replace('p-1.5 rounded-lg border border-amber-500', 'p-2 rounded-lg border border-amber-500 min-h-[44px] min-w-[44px] inline-flex items-center justify-center')
    content = content.replace('p-1.5 rounded-lg border border-green-300', 'p-2 rounded-lg border border-green-300 min-h-[44px] min-w-[44px] inline-flex items-center justify-center')
    content = content.replace('p-1.5 rounded-lg border border-red-200', 'p-2 rounded-lg border border-red-200 min-h-[44px] min-w-[44px] inline-flex items-center justify-center')
    
    # 4. Add min-h-[44px] to main CTA buttons
    content = content.replace('px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)]', 'px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] min-h-[44px]')
    content = content.replace('px-6 py-2 rounded-xl bg-[var(--color-brand-800)]', 'px-6 py-2.5 rounded-xl bg-[var(--color-brand-800)] min-h-[44px]')

    with open(file_path, 'w') as f:
        f.write(content)
    print(f"Upgraded {file_path}")

print("All Secretariat CRUD screens upgraded!")
