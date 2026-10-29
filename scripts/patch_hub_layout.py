with open('src/components/CiseCommandHubLayout.tsx', 'r') as f:
    c = f.read()

target = "href: `/${lang}/hub/management/sections`, icon: Layers, adminOnly: false },"
replacement = """href: `/${lang}/hub/management/sections`, icon: Layers, adminOnly: false },
    { name: lang === 'ar' ? 'الأمانة العامة لـ ICA' : lang === 'zh' ? 'ICA 秘书处管理' : lang === 'ckb' ? 'سکرتاریەتی گشتی ICA' : 'ICA Secretariat Command Hub', href: `/${lang}/secretariat`, icon: Shield, adminOnly: false },"""

if target in c:
    c = c.replace(target, replacement, 1)
    with open('src/components/CiseCommandHubLayout.tsx', 'w') as f:
        f.write(c)
    print("Successfully patched CiseCommandHubLayout.tsx")
else:
    print("Target not found")
