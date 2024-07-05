from pydantic import BaseModel, Field


class Margin(BaseModel):
    top: int = Field(default=20)
    right: int = Field(default=15)
    bottom: int = Field(default=20)
    left: int = Field(default=30)


class SectionSize(BaseModel):
    width: int = Field(default=210)
    height: int = Field(default=297)
    margin: Margin = Field(default=Margin())


class Options(BaseModel):
    size: SectionSize = Field(default=SectionSize())
    toc: bool = Field(default=False)


class ConversionCreate(BaseModel):
    options: Options = Field(default=Options())
    cwd: str = Field(default="")
    notebook: str = Field()
