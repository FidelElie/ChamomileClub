import os;

# TODO sort imports by suits
FILE_EXTENSION = ".svg"

def create_import_name(file_name: str) -> str :
    no_extension = file_name.replace(FILE_EXTENSION, "")
    split_name = no_extension.split("-")
    titledFixes = [name.title() for name in split_name]
    return "".join(titledFixes)

os.chdir(os.path.dirname(__file__))


card_files = os.listdir("./svgs")
card_import_names = [create_import_name(filename) for  filename in card_files]
card_paths = [f"./svgs/{filename}" for filename in card_files]

with open("index.js", "w") as cards_manifest:
    for i in range(len(card_paths)):
        cards_manifest.write("import {} from \"{}\";\n".format(
            card_import_names[i],
            card_paths[i]
        ))
    cards_manifest.write("\n")
    cards_manifest.write("export {{{}}};".format(", ".join(card_import_names)))


