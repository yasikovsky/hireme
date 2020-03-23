export default interface ResumeSection
{
        title: string,
        layout?: SectionLayout,
        preventPrintBreak?: boolean,
        entries:
        {
            title?: string
            subtitle?: string
            tags?: string[]
            url?: string,
            content?: string
        }[]
}

export enum SectionLayout
{
    Default = "Default",
    Horizontal = "Horizontal",
    BulletList = "BulletList"
}