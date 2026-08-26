import { ArrowUpIcon } from "../icons";


export interface SiteFooterProps {
    profile: {
        name: string;
    };
    year?: number;
    footerMessage?: string,
}

export function SiteFooter({
    profile,
    year = new Date().getFullYear(),
    footerMessage = "Built with love <3"

}: SiteFooterProps){

    return(
        <footer className="site-footer">
            <p>© {year} {profile.name}. {footerMessage}</p>
            <a href="#top">Back to top <ArrowUpIcon /></a>
        </footer>
    )

}
