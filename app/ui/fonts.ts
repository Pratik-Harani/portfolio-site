import { Jost, Google_Sans } from 'next/font/google';

//no weight array needed since Jost & Google Sans are both variable fonts
export const jost = Jost({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-display'
});

export const googleSans = Google_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-body'
})