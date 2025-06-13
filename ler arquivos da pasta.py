import os

caminho = r'D:\ArcanasIndex-master\NOVOS CORRIGIDOS SUBSTITUIR'

for raiz, pastas, arquivos in os.walk(caminho):
    for arquivo in arquivos:
        if arquivo.lower().endswith('.html'):
            caminho_completo = os.path.join(raiz, arquivo)
            print(caminho_completo)
