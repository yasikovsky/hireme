export default interface ResumeContactItem
{
    itemType: ContactItemType,
    content: string,
    noPrint?: boolean
}

export enum ContactItemType
{
    PhysicalAddress = "PhysicalAddress",
    EmailAddress = "EmailAddress",
    PhoneNumber = "PhoneNumber",
    Website = "Website",
    GithubUsername = "GithubUsername",
}