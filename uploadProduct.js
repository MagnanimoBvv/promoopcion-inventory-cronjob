const axios = require('axios');

const surfaces = {
    'Curpiel / Metal': 'METAL',
    'Acero Inoxidable y Plastico Termo / Aluminio Boligrafo / Metal Tarjetero': 'METAL',
    'Plastico Bascula / Curpiel Porta Pasaporte e Identificador de Maletas': 'TEXTIL',
    'Curpiel Libreta / Acero Inoxidable Boligrafo / Metal Tarjetero': 'METAL',
    'Curpiel y Metal Boligrafo y Tarjetero / Curpiel y Plastico Power Bank': 'METAL',
    'Madera / Metal': 'METAL',
    'Curpiel': 'TEXTIL',
    'Yute': 'TEXTIL',
    'Acero Inoxidable / Curpiel': 'METAL',
    'Curpiel / Metal / Terciopelo': 'METAL',
    'Poliester': 'TEXTIL',
    'Metal': 'METAL',
    'Yute / PVC': 'TEXTIL',
    'Carton': 'MADERA',
    'Acero Inoxidable': 'METAL',
    'PET': 'PLÁSTICO',
    'Plastico': 'PLÁSTICO',
    'Plastico / Silicon': 'RUBBER',
    'PET / Silicon': 'RUBBER',
    'Vidrio Borosilicato / Silicon / Plastico': 'RUBBER',
    'Vidrio Borosilicato / Bambu / Silicon': 'RUBBER',
    'Plastico / Acero Inoxidable': 'METAL',
    'PET / Concha de Mar / Fibra de Agave': 'PLÁSTICO',
    'Vidrio Borosilicato / Silicon / Acero Inoxidable': 'RUBBER',
    'Vidrio Borosilicato / Plastico': 'VIDRIO',
    'Tritan': 'PLÁSTICO',
    'Plastico / PET Reciclado': 'PLÁSTICO',
    'Plastico / Metal': 'METAL',
    'Vidrio Borosilicato / Silicon / Bambu': 'RUBBER',
    'Vidrio / Bambu': 'VIDRIO',
    'Vidrio Borosilicato / Neopreno / Acero Inoxidable': 'RUBBER',
    'Plastico / Neopreno': 'RUBBER',
    'Tritan / Fibra de Agave': 'PLÁSTICO',
    'Plastico / Bambu': 'MADERA',
    'Plastico / Acero inoxidable': 'METAL',
    'Plastico / PU / Tela': 'TEXTIL',
    'PU / Forro Poliester': 'TEXTIL',
    'Metal / Plastico': 'METAL',
    'Plastico / PU': 'PLÁSTICO',
    'Plastico Reciclado / Bambu Reciclado': 'MADERA',
    'Poliester / PEVA': 'RUBBER',
    'Madera de Haya / Metal': 'METAL',
    'Bambu / Metal': 'METAL',
    'Yute / Algodon': 'TEXTIL',
    'Acero Inoxidable / Caja Kraft': 'METAL',
    'Acero inoxidable / Silicon': 'RUBBER',
    'Bambu': 'MADERA',
    'Yute No Laminado': 'TEXTIL',
    'Bambu / Acero Inoxidable / Silicon': 'RUBBER',
    'Bambu / Vidrio / Granito / Acero Inoxidable': 'CERAMICA',
    'Vidrio / Madera / Piedra': 'CERAMICA',
    'Madera de Haya / Acero Inoxidable': 'METAL',
    'Vidrio / Metal': 'METAL',
    'Vidrio / Acero Inoxidable / Madera / Rubber': 'RUBBER',
    'Vidrio / Acero Inoxidable': 'VIDRIO',
    'Acero Inoxidable / Vidrio / Rubber': 'RUBBER',
    'Bamboo / Metal': 'METAL',
    'Vidrio / Curpiel / Metal': 'METAL',
    'Acero Inoxidable / Poliester': 'TEXTIL',
    'Acero Inoxidable Utensilios / Aluminio y PVC Estuche': 'METAL',
    'Acero Inoxidable Utensilios / Poliester Hielera': 'TEXTIL',
    'Acero Inoxidable y Madera Caucho Utensilios / Poliester Maletin': 'METAL',
    'Acero Inoxidable y Madera Caucho Utensilios / Poliester Mandil': 'METAL',
    'Acero Inoxidable y Plastico Utensilios / Plastico Maletin': 'METAL',
    'Hierro': 'METAL',
    'Acero Inoxidable y Madera Caucho Utensilios / Poliester Estuche': 'METAL',
    'Acero Inoxidable Utensilios.': 'METAL',
    'Acero inoxidable': 'METAL',
    'Acero Inoxidable Utensilios / Poliester Estuche': 'METAL',
    'Aluminio': 'METAL',
    'Poliester / Red de Polipropileno': 'TEXTIL',
    'Algodon Jersey': 'TEXTIL',
    'Poliester / Plastico': 'TEXTIL',
    'Mezclilla': 'TEXTIL',
    'Poliester / Rayon / Spandex': 'TEXTIL',
    'Poliester / Spandex': 'TEXTIL',
    'Plastico / Poliester': 'TEXTIL',
    'Aluminio / Plastico': 'METAL',
    'TPU / Plastico': 'RUBBER',
    'Bambu / Metal Argolla': 'METAL',
    'Plastico / Rubber': 'RUBBER',
    'Plastico /  Metal': 'METAL',
    'Plastico / PVC': 'PLÁSTICO',
    'Nylon / Poliester': 'TEXTIL',
    'Poliester / Nylon': 'TEXTIL',
    'Nylon / Spandex': 'TEXTIL',
    'Algodon / Poliester': 'TEXTIL',
    'Lana / Poliester': 'TEXTIL',
    'Plastico / Asa de Poliester': 'TEXTIL',
    'Yute / Plastico': 'TEXTIL',
    'Madera MDF': 'MADERA',
    'Algodon': 'TEXTIL',
    'Poliester Esponjas / Algodon y PVC Bolsa / Piedra Pomez': 'CERAMICA',
    'Latex / Plastico': 'RUBBER',
    'Algodon / Plastico': 'TEXTIL',
    'Curpiel y PVC Exterior / Poliester Forro': 'TEXTIL',
    'PU/ Poliester': 'TEXTIL',
    'Curpiel / Poliester': 'TEXTIL',
    'Fibra de Bambu / Algodon': 'MADERA',
    'Yute / Mica PVC / Poliester / Curpiel': 'TEXTIL',
    'Piedra Jade / Metal': 'CERAMICA',
    'Curpiel Exterior / Poliester Interior': 'TEXTIL',
    'Plastico / Aluminio': 'METAL',
    'Poliester / Fibra de Bambu / Elastico': 'TEXTIL',
    'Plastico PVC': 'PLÁSTICO',
    'Curpiel y PVC Estuche / Madera, Aluminio y Nailon Brochas / Poliester Toalla / Latex Esponja': 'METAL',
    'Malla / Poliester / Silicon': 'RUBBER',
    'PVC': 'PLÁSTICO',
    'Neopreno / Curpiel': 'RUBBER',
    'Plastico / Latex / Poliester / Madera': 'RUBBER',
    'Plastico / Poliester / PVC': 'PLÁSTICO',
    'Microfibra': 'TEXTIL',
    'Madera': 'MADERA',
    'Goma': 'RUBBER',
    'Madera / Caja de Carton': 'MADERA',
    'Cera / Caja de Carton': 'MADERA',
    'Plastico / Goma': 'RUBBER',
    'Carton / Plastico': 'MADERA',
    'Plastico / Bambu / Fibra de Trigo': 'PLÁSTICO',
    'Bambu / Plastico / Fibra de Trigo': 'PLÁSTICO',
    'Plastico / Fibra de Trigo': 'PLÁSTICO',
    'Fibra de Trigo / Plastico / Carton': 'PLÁSTICO',
    'Fibra de Trigo / Plastico': 'PLÁSTICO',
    'Acero Inoxidable / Ceramica / Silicon': 'RUBBER',
    'Acero Inoxidable / Bambu / Silicon': 'RUBBER',
    'Acero Inoxidable / Tritan / Silicon': 'RUBBER',
    'Aluminio / Curpiel': 'METAL',
    'Plastico Tritan': 'PLÁSTICO',
    'Acero Inoxidable / Plastico': 'METAL',
    'Acrilico': 'PLÁSTICO',
    'Nylon': 'TEXTIL',
    'Cera / Carton': 'MADERA',
    'Peluche': 'TEXTIL',
    'Madera / Canvas / Plastico': 'MADERA',
    'Madera Triplay y MDF': 'MADERA',
    'Papel / Acuarela': 'MADERA',
    'Microfibra / Malla': 'TEXTIL',
    'Paja de Papel': 'MADERA',
    'Metal / Plastico / Poliester': 'METAL',
    'Plastico / Poliester / Metal': 'METAL',
    'Tela / Plastico / Metal': 'METAL',
    'Plastico / Acero': 'METAL',
    'Poliester / Metal / Madera Eucalipto': 'METAL',
    'Eva / Plastico / Metal': 'RUBBER',
    'Curpiel / Metal / Poliester': 'METAL',
    'Carton / Papel Kraft': 'MADERA',
    'Curpiel / Papel': 'MADERA',
    'Carton / Papel': 'MADERA',
    'Corcho': 'MADERA',
    'Carton / Papel Reciclado': 'MADERA',
    'Carton / Papel / Plastico': 'MADERA',
    '': 'N/A',
    'Cupiel / Papel': 'MADERA',
    'Curpiel / Papel / Metal': 'METAL',
    'Curpiel y Metal Libreta / Acero Inoxidable Boligrafo': 'METAL',
    'Curpiel Libreta / Aluminio Boligrafo': 'METAL',
    'Cuerpiel / Papel': 'MADERA',
    'Poliester suave al tacto (piel de durazno) / Cartoncillo rigido / Papel': 'TEXTIL',
    'Papel': 'MADERA',
    'Papel / Carton': 'MADERA',
    'Plastico / Papel': 'PLÁSTICO',
    'Curpiel / Papel / Plastico': 'TEXTIL',
    'Tela tipo lino / papel': 'TEXTIL',
    'Curpiel / Papel / PVC': 'PLÁSTICO',
    'Carton caja / Curpiel y Papel libreta / Aluminio boligrafo': 'METAL',
    'Carton / Espiral metalico': 'MADERA',
    'Carton / Papel 80% algodon / Espiral metalico': 'MADERA',
    'Curpiel (PU) / Bambu': 'MADERA',
    'Curpiel Libreta / Plastico Boligrafo / PVC Bolsa': 'PLÁSTICO',
    'Carton / Papel a Base de Piedra Natural': 'CERAMICA',
    'Piel Reciclada': 'TEXTIL',
    'Curpiel / Lamina de Encino': 'MADERA',
    'Bambu / Curpiel / Plastico': 'MADERA',
    'Canvas / Madera': 'MADERA',
    'Vinil': 'TEXTIL',
    'Madera Poplar': 'MADERA',
    'Aluminio Estuche / Plastico Fichas': 'METAL',
    'Metal  Estuche / Plastico Fichas y Dados': 'METAL',
    'Madera de Tilo / Plastico': 'MADERA',
    'Curpiel Vaso / Plastico Dados': 'PLÁSTICO',
    'Madera de Pino': 'MADERA',
    'Madera de Pino Estuche / Plastico Fichas': 'MADERA',
    'Madera de Tilo Estuche / Plastico Fichas': 'MADERA',
    'Madera de Tilo Base / Plastico Vasos': 'MADERA',
    'Madera de Tilo Estuche / Plastico Fichas y Dados': 'MADERA',
    'Madera de Pino / Acrilico': 'MADERA',
    'MDF / Plastico / Poliester': 'MADERA',
    'Canvas / Bambu': 'MADERA',
    'Plastico / Carton': 'PLÁSTICO',
    'PU': 'PLÁSTICO',
    'Curpiel Estuche / Metal y Plastico Accesorios': 'METAL',
    'Madera Caucho / Metal': 'METAL',
    'Plastico / PET': 'PLÁSTICO',
    'Non Woven': 'TEXTIL',
    'Poliester  Silla / Acero Estructura': 'TEXTIL',
    'Canvas / Curpiel': 'TEXTIL',
    'Bambu / Algodon / Acero Inoxidable': 'METAL',
    'Acero / Madera Caucho / Plastico': 'METAL',
    'Acero Inoxidable / Bambu': 'METAL',
    'Madera de Haya': 'MADERA',
    'Vidrio / Parafina / Corcho': 'MADERA',
    'Aluminio / Parafina': 'METAL',
    'Vidrio / Bambu / Parafina': 'VIDRIO',
    'Bambu / Parafina': 'MADERA',
    'Vidrio / Parafina / Bambu': 'VIDRIO',
    'Mezclilla / Curpiel': 'TEXTIL',
    'Plastico / Fibra de Agave': 'PLÁSTICO',
    'Fibra de Agave y Plastico Lonchera, Contenedor y Cubiertos / Algodon Bolsa': 'PLÁSTICO',
    'Carton Kraft': 'MADERA',
    'Algodon Reciclado': 'TEXTIL',
    'Fibra de trigo / Bambu en tapa': 'PLÁSTICO',
    'Poliester / Aluminio / Plastico': 'METAL',
    'Acero inoxidable / Plastico': 'METAL',
    'Vidrio / Plastico': 'VIDRIO',
    'Poliester / Algodon / Forro Nonwoven': 'TEXTIL',
    'Poliester / Algodon / Forro Poliester': 'TEXTIL',
    'Canvas / Acero Inoxidable / Madera': 'METAL',
    'Madera / Vidrio': 'VIDRIO',
    'Vidrio / Cera de soya / Fibra de poliester /  Fragancia': 'VIDRIO',
    'Bambu / Ceramica': 'CERAMICA',
    'Plastico Armazon / Metal Varillas': 'METAL',
    'Plastico / Fibra de Trigo / Bambu': 'PLÁSTICO',
    'Hule / Metal': 'RUBBER',
    'Metal / Tela': 'METAL',
    'Metal / Fibra de Carbono': 'METAL',
    'Madera Palo de Rosa / Metal': 'METAL',
    'Madera de Nogal / Metal / Curpiel': 'METAL',
    'Metal / Tela / Curpiel': 'METAL',
    'Metal / Poliester': 'METAL',
    'Metal / Curpiel': 'METAL',
    'Curpiel / Vinil': 'TEXTIL',
    'Poliuretano': 'PLÁSTICO',
    'Cuero Reciclado / Carton / Papel': 'MADERA',
    'Curpiel /PVC': 'PLÁSTICO',
    'Plastico / Tela': 'PLÁSTICO',
    'Curpiel / Bambu / Rubber': 'RUBBER',
    'Poliester / Rubber': 'RUBBER',
    'PVC / Curpiel': 'PLÁSTICO',
    'Poliester / PVC': 'TEXTIL',
    'Pongee / Acero Inoxidable': 'RUBBER',
    'Politereftalato / Metal': 'METAL',
    'Poliester / Metal / Curpiel': 'METAL',
    'Poliester / Plastico / Metal': 'METAL',
    '100% Poliester Ecologico': 'TEXTIL',
    '71% Poliester / 29% Bambu': 'TEXTIL',
    '52% Poliester / 48% Bambu': 'TEXTIL',
    '100% Algodon': 'TEXTIL',
    '50% Algodon Peinado / 50% Poliester': 'TEXTIL',
    'Algodon / Poliester / PVC / Curpiel / Plastico': 'TEXTIL',
    'Plastico / Fibra de Trigo / Goma': 'RUBBER',
    'Canvas / Plastico / Fibra de trigo': 'PLÁSTICO',
    'Melamina / Corcho / Aluminio / Carton': 'METAL',
    'Melamina / MDF / Rubber / Plastico': 'RUBBER',
    'Felpa RPET (Reciclado) / Bambu': 'TEXTIL',
    'Corcho / Madera': 'MADERA',
    'Aluminio No Galvanizado': 'METAL',
    'Madera de Roble': 'MADERA',
    'Bambu / Acrilico': 'MADERA',
    'MDF / Vidrio / Flores Secas': 'VIDRIO',
    'Madera Acacia / Metal': 'METAL',
    'Madera Caucho / Ceramica / Metal': 'METAL',
    'Madera Caucho / Acero Inoxidable': 'METAL',
    'Madera Caucho / Metal / Poliester': 'METAL',
    'Marmol / Bambu / Acero Inoxidable': 'CERAMICA',
    'Madera Acacia / Marmol / Metal': 'METAL',
    'Bambu / Piedra / Yute': 'CERAMICA',
    'Bambu Tablas / Metal Base': 'METAL',
    'Vidrio / Madera': 'VIDRIO',
    'Vidrio / Madera / Metal': 'METAL',
    'Aleacion Cobre': 'METAL',
    'Bambu / Rubber / Plastico / Metal': 'RUBBER',
    'Aluminio / Madera': 'METAL',
    'Aluminio / Bambu': 'METAL',
    'Plastico Power Bank / Acero Inoxidable Boligrafo': 'METAL',
    'Metal / Bambu': 'METAL',
    'Acero Inoxidable / Plastico / Curpiel / Carton': 'METAL',
    'Acero Inoxidable / Vidrio': 'VIDRIO',
    'Papel Italiano Premium Caja / Acero Inoxidable, Plastico, Silicon Termo / Curpiel Libreta / Acero Inoxidable Boligrafo / Plastico Power Bank / Curpiel, Metal Llavero': 'METAL',
    'Papel Italiano Premium Caja / Acero Inoxidable , Ceramica, Silicon Termo / Curpiel Libreta / Acero Inoxidable Boligrafo / Plastico Power Bank / Curpiel, Metal Llavero': 'METAL',
    'Carton / Algodon / Papel': 'MADERA',
    'Plastico / Clip Metalico': 'METAL',
    'Aluminio / Rubber': 'RUBBER',
    'Yute / Canvas / Algodon': 'TEXTIL',
    'Non Woven Metalizado': 'TEXTIL',
    'Non Woven Laminado': 'TEXTIL',
    'Poliester / Poliuretano': 'TEXTIL',
    'Poliester / Acetato de Vinilo de Polietileno': 'TEXTIL',
    'Estireno / Poliester': 'PLÁSTICO',
    'Canvas': 'TEXTIL',
    'Poliester / Malla': 'TEXTIL',
    'Polipropileno (Non Woven) / Aluminio': 'METAL',
    'Algodon reciclado': 'TEXTIL',
    'Canvas / Yute': 'TEXTIL',
    'Algodon / Yute': 'TEXTIL',
    'Poliester Exterior / PVC Interior': 'TEXTIL',
    'Poliester y Curpiel Exterior / PVC Interior': 'TEXTIL',
    'Plastico PVC / Poliester': 'PLÁSTICO',
    'Canvas / Poliester': 'TEXTIL',
    'Poliester / Aluminio': 'METAL',
    'Poliuretano / Poliester': 'TEXTIL',
    'Poliester / Curpiel': 'TEXTIL',
    'Non Woven / Poliester': 'TEXTIL',
    'Poliester / Acetato de Vinilo': 'TEXTIL',
    'Poliester / EVA': 'RUBBER',
    'Poliuretano Termoplastico (TPU) / Acetato de Vinilo de Polietileno': 'RUBBER',
    'Curpiel / Corcho / Poliester': 'TEXTIL',
    'Poliester / PU': 'TEXTIL',
    'Poliester / Poliuretano (base)': 'TEXTIL',
    'Poliester / Forro Poliester': 'TEXTIL',
    'Poliester / Acetato de vinilo de polietileno': 'TEXTIL',
    'Poliester / Forro poliester': 'TEXTIL',
    'PU / Poliester': 'TEXTIL',
    'PU y Poliester / Forro Poliester': 'TEXTIL',
    'Poliuretano / Acetato de Vinilo de Polietileno / Poliester': 'TEXTIL',
    'Poliester / Forro Acetato de vinilo de polietileno': 'TEXTIL',
    'PU / Poliester / PVC': 'PLÁSTICO',
    'Nylon / Acetato de vinilo de polietileno': 'TEXTIL',
    'Algodon / Poliester / Curpiel / Mimbre': 'TEXTIL',
    'Felpa': 'TEXTIL',
    'Poliester / Algodon': 'TEXTIL',
    'Poliester / Poliuretano / EVA': 'RUBBER',
    'Poliuretano / Poliester / Metal': 'METAL',
    'Paja de Papel / Curpiel / Poliester': 'MADERA',
    'Algodon 220 gr': 'TEXTIL',
    'Curpiel /  Poliester / Poliester': 'TEXTIL',
    'Plastico ABS / Poliester': 'PLÁSTICO',
    'Poliester / Acetato de vinilo de polietileno / Termoplastico': 'PLÁSTICO',
    'Hilo de Algodon Laminado de Papel / Acetato de Vinilo de Polietileno': 'TEXTIL',
    'Poliuretano / Acetato de Vinilo de Polietileno': 'PLÁSTICO',
    'Poliester / Laminado de Poliester / Acetato de Vinilo de Polietileno': 'TEXTIL',
    'Laminado de Poliester / Lona': 'TEXTIL',
    'PU /Poliester / Acetato de vinilo de polietileno': 'TEXTIL',
    'Poliester / Policarbonato': 'PLÁSTICO',
    'Poliester/Malla': 'TEXTIL',
    'Poliester / Acetato de vinilo de polietileno / Metal': 'METAL',
    'Poliester / Acetato de Vinilo de Polietileno / Metal': 'METAL',
    'Poliester / Aluminio plastificado': 'METAL',
    'PVC / Gel': 'RUBBER',
    'Plastico / Gel': 'RUBBER',
    'Cristal': 'VIDRIO',
    'Poliester Cubrebocas / PET Calibre 15 Careta': 'PLÁSTICO',
    'Plastico /Silicon': 'RUBBER',
    'Plastico Diadema  / PET Calibre 20 Careta': 'PLÁSTICO',
    'Bambu / Plastico': 'MADERA',
    'Plastico Imitacion Madera': 'PLÁSTICO',
    'Polietileno / Poliuretano': 'PLÁSTICO',
    'EVA': 'RUBBER',
    'Curpiel / Forro Multi Poli Algodon': 'TEXTIL',
    'TPU 4 mm / Cuero Sintetico / Forro Multi Poli Algodon': 'RUBBER',
    'TPU 2.5 mm / Cuero Sintetico / Forro Multi Poli Algodon': 'RUBBER',
    'PVC Tapete / Poliester Funda': 'PLÁSTICO',
    'Poliester / TPE': 'RUBBER',
    'Espuma NBR Tapete / Poliester Funda': 'RUBBER',
    'Neopreno / Poliester': 'RUBBER',
    'Madera / Plastico / Poliester': 'MADERA',
    'Acero / Cubierta PVC': 'METAL',
    'Poliester / Poliuretano Termoplastico': 'RUBBER',
    'Poliester Exterior / Algodon Interior': 'TEXTIL',
    'Ceramica': 'CERAMICA',
    'Porcelana / Acero Inoxidable': 'CERAMICA',
    'Ceramica / Silicon': 'RUBBER',
    'Porcelana': 'CERAMICA',
    'Ceramica / Bambu': 'CERAMICA',
    'Acero Inoxidable / Plastico / Corcho': 'RUBBER',
    'Porcelana / Corcho': 'CERAMICA',
    'Acero Inoxidable / Corcho / Plastico': 'RUBBER',
    'Porcelana / Madera de Caucho / Acero Inoxidable 201': 'CERAMICA',
    'Ceramica / Acero Inoxidable / Madera de Haya': 'CERAMICA',
    'Vidrio Borosilicato / Bambu': 'VIDRIO',
    'Vidrio': 'VIDRIO',
    'Ceramica / Plastico / Metal': 'METAL',
    'Ceramica / Bambu / Acero Inoxidable / Metal': 'METAL',
    'Ceramica / Madera': 'CERAMICA',
    'Vidrio Borosilicato': 'VIDRIO',
    'Vidrio / Plastico / Silicon': 'RUBBER',
    'Ceramica / Corcho': 'CERAMICA',
    'Ceramica / Plastico / Acero inoxidable': 'METAL',
    'Acero Inoxidable / Plastico / Silicon': 'RUBBER',
    'Acero Inoxidable / Bambu / Plastico / Silicon': 'RUBBER',
    'Acero Inoxidable / Plastico / Madera': 'METAL',
    'Acero Reciclado': 'METAL',
    'Vidrio Borosilicato / Acero Inoxidable / Plastico': 'METAL',
    'Vidrio Borosilicato / Plastico / Acero Inoxidable': 'METAL',
    'Vidrio Borosilicato / Plastico Reciclado': 'VIDRIO',
    'Acero inoxidable / Plastico / Silicon': 'RUBBER',
    'Acero Inoxidable / Plastico / Ceramica': 'METAL',
    'Acero Inoxidable / Corcho': 'METAL',
    'Acero Inoxidable / Plastico / Bambu / Silicon': 'RUBBER',
    'Acero Inoxidable / Silicon': 'RUBBER',
    'Plastico / Vidrio / Bambu': 'VIDRIO',
    'Vidrio Borosilicato/ Acero Inoxidable / Plastico': 'METAL',
    'Aluminio / Plastico / Bambu': 'METAL',
    'Plastico / Acero inoxidable / Silicon': 'RUBBER',
    'Vidrio borosilicato / Silicon': 'RUBBER',
    'Acero inoxidable / Plastico / Rubber': 'RUBBER',
    'Acero inoxidable / Plastico / Poliester / PU': 'METAL',
    'Plastico AS': 'PLÁSTICO',
    'Aluminio reciclado / Acero inoxidable': 'METAL',
    'Metal / Rubber': 'RUBBER',
    'Plastico Reciclado': 'PLÁSTICO',
    'Madera de Arce / Metal': 'METAL',
    'Piel Corte Vacuno / Forro Textil': 'TEXTIL',
    'Curpiel / Forro Textil': 'TEXTIL',
    'Plastico / Metal Aro Magnetico': 'METAL',
    'Plastico / Metal / Curpiel': 'METAL',
};

const printingTechniques = {
    'Laser y Serigrafia en Boligrafo y Tarjetero': 'GRABADO LÁSER',
    'Laser, Serigrafia y Termograbado en Llavero': 'GRABADO LÁSER',
    'Laser': 'GRABADO LÁSER',
    'Laser, Serigrafia y Tampografia en Termo': 'GRABADO LÁSER',
    'Laser y Termograbado en Libreta': 'GRABADO LÁSER',
    'Grabado Arena': 'GRABADO LÁSER',
    'Laser en Control de Audifonos': 'GRABADO LÁSER',
    'Pantografo': 'GRABADO LÁSER',
    'Grabado Arena Vaso': 'GRABADO LÁSER',
    'Laser y Tampografia Sacacorchos': 'GRABADO LÁSER',
    'Laser en Utensilios': 'GRABADO LÁSER',
    'Termograbado': 'GRABADO LÁSER',
    'Grabado Espejo': 'GRABADO LÁSER',
    'Laser en Placa Metalica': 'GRABADO LÁSER',
    'Laser en boligrafo': 'GRABADO LÁSER',
    'Termograbado en Libreta': 'GRABADO LÁSER',
    'Laser y Serigrafia en Boligrafo': 'GRABADO LÁSER',
    'Serigrafia y Termograbado Libreta/ Laser Boligrafo': 'GRABADO LÁSER',
    'Laser Corcho': 'GRABADO LÁSER',
    'Laser en Tabla': 'GRABADO LÁSER',
    'Laser en Mango': 'GRABADO LÁSER',
    'Serigrafia y Laser en Bambu': 'GRABADO LÁSER',
    'Grabado Espejo en Boligrafo': 'GRABADO LÁSER',
    'Laser, Libreta y Termo': 'GRABADO LÁSER',
    'Termograbado Libreta': 'GRABADO LÁSER',
    'Laser Termo, Boligrafo, Llavero': 'GRABADO LÁSER',
    'Libreta Termograbado': 'GRABADO LÁSER',
    'Grabado Espejo Boligrafo': 'GRABADO LÁSER',
    'Laser en Placa': 'GRABADO LÁSER',
    'Grabado en Arena': 'GRABADO LÁSER',
    'Grabado en arena': 'GRABADO LÁSER',
    'Grabado Espejo en Tapa': 'GRABADO LÁSER',
    'Laser Tazas': 'GRABADO LÁSER',
    'Grabado laser': 'GRABADO LÁSER',
    'Serigrafia': 'SERIGRAFÍA',
    'Tampografia': 'SERIGRAFÍA',
    'Serigrafia en Vidrio': 'SERIGRAFÍA',
    'Serigrafia con Tinta UV': 'SERIGRAFÍA',
    'Serigrafia con Tinta Especial': 'SERIGRAFÍA',
    'Serigrafia en Estuche': 'SERIGRAFÍA',
    'Serigrafia Estuche': 'SERIGRAFÍA',
    'Tampografia Copas': 'SERIGRAFÍA',
    'Seigrafia': 'SERIGRAFÍA',
    'Serigrafia en Lonchera, Contenedor y Cubiertos': 'SERIGRAFÍA',
    'Bordado y Serigrafia en Bolsa': 'SERIGRAFÍA',
    'Serigrafia en Cubierta': 'SERIGRAFÍA',
    'Serigrafia en Mango': 'SERIGRAFÍA',
    'Serigrafia en Power Bank': 'SERIGRAFÍA',
    'Serigrafia Caja': 'SERIGRAFÍA',
    'Serigrafia Boligrafo': 'SERIGRAFÍA',
    'Tampografia Power Bank': 'SERIGRAFÍA',
    'Power Bank Tampografia': 'SERIGRAFÍA',
    'Serigrafia/ Bordado': 'SERIGRAFÍA',
    'Serigafia': 'SERIGRAFÍA',
    'Serigrafia en Estuche y Selfie Stick': 'SERIGRAFÍA',
    'Tampografia en Selfie Stick': 'SERIGRAFÍA',
    'Serigrafia Prensa': 'SERIGRAFÍA',
    'Bordado': 'BORDADO',
    'Goteado en Resina': 'GOTA DE RESINA',
    'Sublimacion': 'SUBLIMACION',
    'Sublimacion en Color Blanco': 'SUBLIMACION',
    'Termocalca': 'SUBLIMACION',
    'Full Color': 'FULL COLOR',
    'Vinil Textil': 'FULL COLOR',
    'Impresion Digital': 'FULL COLOR',
    'Heat Transfer': 'FULL COLOR',
};

const categories = {
  'OFICINA - SETS EJECUTIVOS': 'oficina,accesorios de oficina',
  'ARTICULOS PARA VIAJE - ACCESORIOS PARA VIAJE': 'hogar,accesorios',
  'BAR - SETS Y ESTUCHES': 'hogar,bar',
  'BAR - LICORERAS': 'hogar,bar',
  'COMPLEMENTOS - ACC Y COMPLEMENTOS': 'hogar,accesorios',
  'BOLSAS - BOLSAS ECOLOGICAS': 'ecologicos,bolsas ecologicas,textil,bolsas y morrales',
  'AGENDAS ZEGNO - SEMANAL': 'oficina,libretas',
  'AGENDAS ZEGNO - DIARIA': 'oficina,libretas',
  'BEBIDAS - CILINDROS DE PLASTICO': 'bebidas,cilindros',
  'BEBIDAS - CILINDROS DE VIDRIO': 'bebidas,cilindros',
  'TECNOLOGIA - ACCESORIOS PARA SMARTPHONE Y TABLET': 'tecnologia,accesorios',
  'TECNOLOGIA - AUDIFONOS': 'tecnologia,audifonos',
  'TECNOLOGIA - BOCINAS': 'tecnologia,bocinas',
  'BAR - ARTICULOS PARA BAR': 'hogar,bar',
  'BAR - DESTAPADORES': 'hogar,bar',
  'BAR - SACACORCHOS': 'hogar,bar',
  'HOGAR - BBQ': 'hogar,bbq',
  'OFICINA - ARTICULOS DE OFICINA': 'oficina,accesorios de oficina',
  'TEXTILES - GORRAS Y SOMBREROS': 'textil,gorras y cangureras',
  'TECNOLOGIA - ACCESORIOS DE COMPUTO': 'tecnologia,accesorios',
  'TECNOLOGIA - BASES Y SOPORTES': 'tecnologia,accesorios',
  'TECNOLOGIA - CABLES Y CARGADORES': 'tecnologia,cargadores',
  'TEXTILES - CHAMARRAS Y CHALECOS': 'textil,chamarras y chalecos',
  'HOGAR - DECORACION': 'hogar,accesorios',
  'TECNOLOGIA - POWER BANKS': 'tecnologia,power bank',
  'OFICINA - CALCULADORAS': 'oficina,accesorios de oficina',
  'BELLEZA - ESPEJOS': 'hogar,belleza',
  'BELLEZA - COSMETIQUERAS': 'hogar,belleza',
  'BELLEZA - MANICURE': 'hogar,belleza',
  'BELLEZA - BROCHAS Y MAQUILLAJE': 'hogar,belleza',
  'BELLEZA - SETS DE BELLEZA': 'hogar,belleza',
  'ARTICULOS PARA VIAJE - NECESER': 'textil,bolsas y morrales',
  'BELLEZA - ARTICULOS DE DAMA': 'hogar,belleza',
  'BELLEZA - COSTUREROS': 'hogar,belleza',
  'LLAVEROS - LLAVEROS FUNCIONES': 'hogar,llaveros',
  'NINOS - ESCOLARES': 'oficina,escolares',
  'ESCRITURA - BOLIGRAFOS ECOLOGICOS': 'ecologicos,boligrafos ecologicos,oficina,boligrafos',
  'BEBIDAS - TERMO METALICO': 'bebidas,termos',
  'ESCRITURA - SET DE BOLIGRAFOS': 'oficina,boligrafos',
  'NINOS - JUGUETES': 'fitness y tiempo libre,entretenimiento',
  'ESCRITURA - BOLIGRAFOS PLASTICO': 'oficina,boligrafos',
  'ESCRITURA - BOLIGRAFOS FUNCIONES': 'oficina,boligrafos',
  'DEPORTES - ARTICULOS DEPORTIVOS': 'fitness y tiempo libre,deportes',
  'HERRAMIENTAS - AUTOMOVIL': 'herramientas,accesorios para auto',
  'HERRAMIENTAS - SET DE HERRAMIENTAS': 'herramientas,herramientas generales',
  'HOGAR - JARDINERIA': 'hogar,accesorios',
  'HERRAMIENTAS - NAVAJAS': 'herramientas,navajas multifuncionales',
  'OFICINA - PORTA NOTAS': 'oficina,accesorios de oficina',
  'LIBRETAS Y CARPETAS - LIBRETAS EJECUTIVAS': 'oficina,libretas',
  'LIBRETAS Y CARPETAS - LIBRETAS ECOLOGICAS': 'ecologicos,libretas ecologicas,oficina,libretas',
  'LIBRETAS Y CARPETAS - SETS DE LIBRETAS': 'oficina,libretas',
  'PARAGUAS E IMPERMEABLES - IMPERMEABLES': 'textil,paraguas e impermeables',
  'NINOS - ALCANCIAS': 'hogar,accesorios',
  'DEPORTES - SOCCER': 'fitness y tiempo libre,deportes',
  'ENTRETENIMIENTO - JUEGOS': 'fitness y tiempo libre,entretenimiento',
  'ENTRETENIMIENTO - SETS ENTRETENIMIENTO': 'fitness y tiempo libre,entretenimiento',
  'LLAVEROS - LLAVEROS METALICOS': 'hogar,llaveros',
  'SALUD - CUIDADO PERSONAL': 'hogar,salud y cuidado personal',
  'HIELERAS LONCHERAS Y PORTAVIANDAS - PORTAVIANDAS': 'hogar,contenedores de alimentos',
  'HOGAR - COCINA': 'hogar,cocina',
  'HOGAR - TABLAS Y SETS DE QUESOS': 'hogar,cocina',
  'HIELERAS LONCHERAS Y PORTAVIANDAS - HIELERAS Y LONCHERAS': 'hogar,hieleras,loncheras',
  'HOGAR - MANDILES': 'hogar,cocina',
  'HOGAR - CESTOS': 'hogar,accesorios',
  'HERRAMIENTAS - LAMPARAS': 'herramientas,lamparas multifuncionales,tecnologia,lamparas',
  'ARTICULOS PARA VIAJE - LENTES': 'hogar,salud y cuidado personal', // Lentes
  'LIBRETAS Y CARPETAS - CARPETAS': 'oficina,carpetas',
  'ARTICULOS PARA VIAJE - PORTA DOCUMENTOS': 'textil,bolsas y morrales',
  'OFICINA - RELOJES': 'hogar,relojes de pared y escritorio',
  'PARAGUAS E IMPERMEABLES - PARAGUAS': 'textil,paraguas e impermeables',
  'HOGAR - MASCOTAS': 'fitness y tiempo libre,mascotas',
  'TEXTILES - PLAYERAS': 'textil,playeras',
  'OFICINA - PORTAGAFETE': 'oficina,accesorios de oficina',
  'ARTICULOS PARA VIAJE - ORGANIZADORES': 'textil,bolsas y morrales',
  'SALUD - PASTILLEROS': 'hogar,salud y cuidado personal',
  'ESCRITURA - BOLIGRAFOS METALICOS': 'oficina,boligrafos',
  'TECNOLOGIA - SETS TECNOLOGIA': 'tecnologia,accesorios',
  'MOCHILAS - MOCHILAS ESCOLARES': 'textil,mochilas,oficina,escolares',
  'BOLSAS - BOLSA MOCHILA': 'textil,bolsas y morrales,mochilas',
  'BOLSAS - BOLSAS REUTILIZABLES': 'ecologicos,bolsas ecologicas,textil,bolsas y morrales',
  'PORTAFOLIOS - PORTAFOLIOS Y PORTALAPTOPS': 'textil,portafolios,porta laptop',
  'MOCHILAS - MOCHILAS EJECUTIVAS': 'textil,mochilas',
  'MOCHILAS - MOCHILAS TROLLEY': 'textil,mochilas',
  'MALETAS - MALETAS TROLLEY': 'textil,maletas',
  'MALETAS - MALETAS DE MANO': 'textil,maletas',
  'MOCHILAS - MOCHILAS DEPORTIVAS': 'textil,mochilas,fitness y tiempo libre,deportes',
  'HIELERAS LONCHERAS Y PORTAVIANDAS - MOCHILA HIELERA': 'textil,mochilas,hieleras',
  'BOLSAS - BOLSAS CASUALES': 'textil,bolsas y morrales',
  'ARTICULOS PARA VIAJE - CANGURERA Y MOCHILAS DE VIAJE': 'textil,mochilas,gorras y cangureras',
  'MOCHILAS - MOCHILAS DE VIAJE': 'textil,mochilas',
  'SALUD - GELES Y SANITIZANTES': 'hogar,salud y cuidado personal',
  'ANTIESTRES - FIGURAS ANTIESTRES': 'fitness y tiempo libre,antiestres',
  'BEBIDAS - TAZAS': 'bebidas,tazas',
  'BEBIDAS - CILINDROS METALICOS': 'bebidas,cilindros',
  'BEBIDAS - TERMO DE PLASTICO': 'bebidas,termos',
  'BEBIDAS - VASOS': 'bebidas,vasos',
  'BEBIDAS - ARTICULOS PARA CAFE': 'hogar,cocina',
  'TECNOLOGIA - USB': 'tecnologia,gadgets,memorias usb,clasicas'
};

function mappingPrintingTechniques(techniques) {
    const techniquesArray = techniques
        .split(' / ')
        .map(tech => printingTechniques[tech.trim()]);
    
    return [...new Set(techniquesArray)].join('-');
}

function productHasSize(variants) {
    return variants.some(variant => variant.talla !== null);
}

function getMedia(productMd, vectorsMedia, variants) {
    const notFoundImage = 'https://www.contenidopromo.com/Images/Items/notFound.jpg';

    const productMedia = productMd
        .filter(src => src !== notFoundImage)
        .map(src => ({
            mediaContentType: 'IMAGE',
            originalSource: encodeURI(src),
        }));
    const vectorMedia = vectorsMedia
        .filter(src => src !== notFoundImage)
        .map(src => ({
            mediaContentType: 'IMAGE',
            originalSource: encodeURI(src),
        }));
    const variantMedia = variants.flatMap(variant => (variant.imagenesHijo || [])
        .filter(src => src !== notFoundImage)
        .map((src, i) => ({
            alt: i === 0 ? variant.color : '',
            mediaContentType: 'IMAGE',
            originalSource: encodeURI(src),
        }))
    );

    const allMedia = [...productMedia, ...variantMedia, ...vectorMedia];

    // Filtra imágenes duplicadas por alt, sobretodo en ropa
    const colors = [];
    return allMedia.filter(item => {
        if (!item.alt) return true; // Si es imagen de producto
        if (colors.includes(item.alt)) return false; //Si ya hay imagen de ese color
        colors.push(item.alt); // Si no hay imagen de ese color
        return true;
    });
}

function getWeight(package) {
    return parseFloat(package.pesoNeto) / parseFloat(package.PiezasCaja);
}

async function uploadShopifyProduct(input, media) {
    const response = await axios.post(
        process.env.GRAPHQL_URL,
        JSON.stringify({
            query: `
                mutation productCreate($input: ProductInput!, $media: [CreateMediaInput!]) {
                    productCreate(input: $input, media: $media) {
                        product {
                            id
                            media(first: 20) {
                                nodes {
                                    id
                                    alt
                                }
                            }
                        }
                        userErrors {
                            message
                            field
                        }
                    }
                }
            `,
            variables: {
                input,
                media,
            }
        }), {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
            }
        }
    );
    // console.log(response.data.data.productCreate.product.media.nodes);

    return response.data.data.productCreate.product;
}

async function uploadVariants(productId, variants) {
    const response = await axios.post(
        process.env.GRAPHQL_URL,
        JSON.stringify({
            query: `
                mutation ProductVariantsCreate($productId: ID!, $strategy: ProductVariantsBulkCreateStrategy, $variants: [ProductVariantsBulkInput!]!) {
                    productVariantsBulkCreate(productId: $productId, strategy: $strategy, variants: $variants) {
                        productVariants {
                            id
                            title
                        }
                        userErrors {
                            message
                            field
                        }
                    }
                }
            `,
            variables: {
                productId,
                strategy: 'REMOVE_STANDALONE_VARIANT', //Usa este argumento para eliminar variante por defecto
                variants,
            }
        }), {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
            }
        }
    );
    // console.log(response.data.data.productVariantsBulkCreate.userErrors);

    return response.data.data.productVariantsBulkCreate.productVariants;
}

async function publishProduct(id, input) {
    const response = await axios.post(
        process.env.GRAPHQL_URL,
        JSON.stringify({
            query: `
                mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
                    publishablePublish(id: $id, input: $input) {
                        publishable {
                            availablePublicationsCount {
                                count
                            }
                        }
                        userErrors {
                            message
                            field
                        }
                    }
                }
            `,
            variables: {
                id,
                input,
            }
        }), {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
            }
        }
    );

    return response.data.data.publishablePublish.publishable;
}

async function uploadProduct(product, locationId, productPublications) {
    try {
        const activeVariants = product.hijos.filter(variant => variant.estatus === '1');
        const hasSize = productHasSize(activeVariants);

        const productTitle = `${product.nombrePadre} ${product.skuPadre}`.trim().replace(/-+$/g, ''); // Quita guiones al final
        const productPrintingTechniques = mappingPrintingTechniques(product.impresion.tecnicaImpresion);
        const productInput = {
            handle: productTitle.toLowerCase().replace(/[\s/]+/g, '-'), // Reemplaza espacios y diagonales
            title: productTitle,
            descriptionHtml: product.descripcion,
            vendor: 'PromoOpcion',
            tags: 'promoopcion,' + categories[`${product.categorias} - ${product.subCategorias}`.trim()],
            metafields: [
                {
                    key: 'superficie',
                    namespace: 'custom',
                    type: 'single_line_text_field',
                    value: surfaces[product.material],
                },
                {
                    key: 'medidas',
                    namespace: 'custom',
                    type: 'single_line_text_field',
                    value: product.medidas,
                },
                {
                    key: 'tecnicas_de_impresion',
                    namespace: 'custom',
                    type: 'single_line_text_field',
                    value: productPrintingTechniques,
                },
            ],
            productOptions: [
                {
                    name: 'Color',
                    values: [
                        { name: 'Default' }
                    ],
                },
                ...(hasSize ? [{
                    name: 'Talla',
                    values: [
                        { name: 'Default' }
                    ],
                }] : []),
            ],
        };

        const productMedia = getMedia(product.imagenesPadre, product.imagenesVector, activeVariants);

        const productResponse = await uploadShopifyProduct(productInput, productMedia);

        const productId = productResponse.id;
        const productWeight = getWeight(product.paquete);
        const productPrice = parseFloat(activeVariants[0].precio) / 0.67;

        const productMediaNodes = productResponse.media.nodes;
        const defaultMediaId = productMediaNodes[0].id;

        const productVariants = activeVariants.map(variant => {
            const matchedMedia = productMediaNodes.find(m => m.alt === variant.color);
            const mediaId = matchedMedia ? matchedMedia.id : defaultMediaId;

            return {
                inventoryItem: {
                    measurement: {
                        weight: {
                            unit: 'KILOGRAMS',
                            value: productWeight,
                        }
                    },
                    sku: variant.skuHijo,
                    tracked: true,
                },
                mediaId,
                inventoryQuantities: [
                    {
                        availableQuantity: 500,
                        locationId,
                    }
                ],
                optionValues: [
                    {
                        name: variant.color,
                        optionName: 'Color',
                    },
                    ...(hasSize ? [{
                        name: variant.talla,
                        optionName: 'Talla',
                    }] : []),
                ],
                price: productPrice,
            };
        });
        const variantResponse = await uploadVariants(productId, productVariants);

        const publishResponse = await publishProduct(productId, productPublications);

        console.log(`Variantes de ${product.skuPadre} subidas y publicadas en ${publishResponse.availablePublicationsCount.count} canales: ${variantResponse.map(v => v.title).join(', ')}`);
        return true;
    } catch (error) {
        console.error(`Error subiendo el producto ${product.nombrePadre} ${product.skuPadre}:`, error);
        return false;
    }
}

module.exports = { uploadProduct };
