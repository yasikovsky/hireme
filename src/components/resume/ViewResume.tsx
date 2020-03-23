import React from "react"
import {Helmet} from 'react-helmet'
import ResumeSection, { SectionLayout } from "../../entities/resume/ResumeSection"
import ResumeContactItem, { ContactItemType } from "../../entities/resume/ResumeContactItem"
import {ReactComponent as EmailIcon} from '../../images/icons/mail.svg'
import {ReactComponent as GithubIcon} from '../../images/icons/github.svg'
import {ReactComponent as PhoneIcon} from '../../images/icons/call.svg'
import {ReactComponent as WebsiteIcon} from '../../images/icons/globe.svg'
import {ReactComponent as LinkIcon} from '../../images/icons/link.svg'
import {ReactComponent as HomeIcon} from '../../images/icons/home.svg'
import {ReactComponent as DownloadIcon} from '../../images/icons/pdf.svg'
import ConditionalWrapper from "../core/ConditionalWrapper"
import './ViewResume.scss';

export interface ResumeProps
{
    name: string
    fileUrl?: string
    pageTitle?: string
    footer?: string
    layout?: ResumeLayoutType
    contactItems?: ResumeContactItem[]
    sections?: ResumeSection[]
    photoUrl?: string
}

export enum ResumeLayoutType
{
    SingleColumn = "SingleColumn",
    DoubleColumn = "DoubleColumn"
}

const ViewResume: React.FC<ResumeProps> = (props: ResumeProps) =>
{
    const layout = props.layout ? props.layout : ResumeLayoutType.SingleColumn;

    const getContactItemNode = (contactItem: ResumeContactItem) =>
    {
        switch (contactItem.itemType)
        {
            case ContactItemType.EmailAddress:
                return (<span className={`resume-contact-item-content ${contactItem.noPrint ? ' noprint' : ''}`}>
                            <a href={"mailto:"+ contactItem.content}>
                                <EmailIcon className={"icon contact-icon"} />
                                <span>{contactItem.content}</span>
                            </a>
                        </span>)
            case ContactItemType.GithubUsername:
                return (<span className={`resume-contact-item-content ${contactItem.noPrint ? ' noprint' : ''}`}>
                            <a href={"https://github.com/"+ contactItem.content} target="_blank" rel='noreferrer noopener'>
                                <GithubIcon className="icon contact-icon" />
                                <span>{`github.com/${contactItem.content}`}</span>
                            </a>
                        </span>)
            case ContactItemType.PhoneNumber:
                return (<span className={`resume-contact-item-content ${contactItem.noPrint ? ' noprint' : ''}`}>
                            <PhoneIcon className="icon contact-icon" />
                            <span>{contactItem.content}</span>
                        </span>)
            case ContactItemType.PhysicalAddress:
                return (<span className={`resume-contact-item-content ${contactItem.noPrint ? ' noprint' : ''}`}>
                            <HomeIcon className="icon contact-icon" />
                            <span>{contactItem.content}</span>
                        </span>)
            case ContactItemType.Website:
                return (<span className={`resume-contact-item-content ${contactItem.noPrint ? ' noprint' : ''}`}>
                        <a href={"https://"+ contactItem.content} target="_blank" rel='noreferrer noopener'>
                            <WebsiteIcon className="icon contact-icon" />
                            <span>{contactItem.content}</span>
                        </a>
                        </span>)
        }
    }

    const getLayoutClassName = (className: string, layoutType?: SectionLayout) =>
    {
        if (!layoutType)
            return className;

        switch (layoutType)
        {
            case SectionLayout.Horizontal:
                return `${className} ${className}-horizontal`;
            case SectionLayout.BulletList:
                return `${className} ${className}-bullet-list`;
        }

        return className;
    }

    return (
        <div className="resume-container">
            <div className="resume-header">
                {!props.photoUrl &&
                    <div className="resume-header-initials">
                        {props.name.replace("-", " ").split(" ").map(nameWord =>
                        {
                            return <span className="resume-header-initials-item">{nameWord[0]}</span>
                        })}
                    </div>}
                {props.photoUrl &&
                    <div className="resume-photo">
                        <img src={props.photoUrl} alt="My face"/>
                    </div>
                }
                <div className="resume-header-name">
                    {props.name}
                </div>
                {props.fileUrl && 
                    <div className="resume-download"><a href={props.fileUrl}><DownloadIcon className="icon resume-download-icon"/><span className="resume-download-text">Download PDF</span></a></div>
                }
            </div>
            {props.contactItems &&
                <div className="resume-contact">
                    {props.contactItems.map((contactItem, index) =>
                    {
                        return (
                            <div className="resume-contact-item">
                                {index > 0 ? 
                                    <span className="resume-contact-item-divider">|</span> 
                                    : ''}
                               {getContactItemNode(contactItem)}
                            </div>
                        )
                    })}
                </div>}
            {props.sections &&
                <div className={`resume-sections sections-${layout.toLowerCase()}`}>
                    {props.sections.map(section =>
                    {
                        return (
                            <>
                            <Helmet>
                                <title>{props.pageTitle}</title>
                            </Helmet>
                            <div className={`resume-section${section.preventPrintBreak ? ' prevent-print-break' : ''}`}>
                                <div className="resume-section-title">{section.title}</div>
                                    <div className={getLayoutClassName("resume-section-entries", section.layout)}>
                                    <ConditionalWrapper
                                        condition={section.layout === SectionLayout.BulletList}
                                        wrapper={(item: any) => <ul>{item}</ul>}
                                    >
                                    {section.entries.map((sectionEntry) =>
                                    {
                                        return (
                                            <ConditionalWrapper
                                            condition={section.layout === SectionLayout.BulletList}
                                            wrapper={(item: any) => <li key="index">{item}</li>}
                                            >
                                            <div className={getLayoutClassName("resume-section-entry", section.layout)}>
                                                {sectionEntry.title && 
                                                    <div className={getLayoutClassName("resume-section-entry-title", section.layout)}>{sectionEntry.title} {sectionEntry.url && 
                                                        <a className={getLayoutClassName("resume-section-entry-url", section.layout)} href={sectionEntry.url} target="_blank" rel='noreferrer noopener'><LinkIcon className="icon link-icon" /></a>}</div>}
                                                {sectionEntry.subtitle && 
                                                    <div className={getLayoutClassName("resume-section-entry-subtitle", section.layout)}>{sectionEntry.subtitle}</div>}
                                                {sectionEntry.tags &&
                                                    <div className={getLayoutClassName("resume-section-entry-tags", section.layout)}>
                                                        {sectionEntry.tags.map(tag => <div className="tag">{tag}</div>)}
                                                    </div>
                                                }
                                                {sectionEntry.content && 
                                                    <div className={getLayoutClassName("resume-section-entry-content", section.layout)}>{sectionEntry.content.split("\n").map(item => <p className={`content-paragraph ${layout.toLowerCase()}-paragraph`}>{item}</p>)}</div>}
                                            </div>
                                            </ConditionalWrapper>
                                        )
                                    })}
                                    </ConditionalWrapper>
                                </div>
                            </div>
                            </>
                        )
                    })}
                </div>}
            {props.footer &&
                <div className="resume-footer" dangerouslySetInnerHTML={{__html: props.footer}} />
            }
        </div>
    )
}

export default ViewResume;