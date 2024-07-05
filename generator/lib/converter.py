import asyncio
import json

from .schemas import Options

from jupyter_convert_core import parse_jupyter, generate_document
from jupyter_convert_core.types import Section


async def convert(cwd: str, notebook: str, options: Options) -> bytes | None:
    jupyter = json.load(open(notebook, "r", encoding="utf-8"))

    def inner():
        try:
            cells = parse_jupyter(jupyter)

            size = options.size.dict()

            margin = size.pop("margin")

            return generate_document(
                cells=cells,
                generate_toc=options.toc,
                cwd=cwd,
                section_opts=Section(**margin, **size),
            )
        except:
            return None

    return await asyncio.to_thread(inner)
