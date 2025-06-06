import { NextRequest, NextResponse } from 'next/server';
import { USER_ROLES } from './app/utils/roles';


export default function middleware(req: NextRequest) {
    const unsignedPaths = ['/login', '/register'];

    const studentPaths = [
        // DISCENTE
        '/article-screen',
        '/article-submission',
        '/event-screen',
        '/home',
        '/published-articles',
        '/user-profile',
    ];
    const professorPaths = [...studentPaths]; // DISCENTE+DOCENTE
    const techManagerPaths = [
        // DISCENTE+DOCENTE+TECNICO
        ...professorPaths,
        '/authorities-assignment',
        '/manage-event',
    ];
    const adminPaths = [
        ...techManagerPaths,
        '/create-event',
        '/articles-assignment',
        '/review-screen',
        '/published-reviews',
    ];

    // const role = "ADMIN" //req.cookies.get('@SAGAN_ACCESS_TOKEN')?.value;
    // const backLogin = new URL('/login', req.url);
    // const backHome = new URL('/home', req.url);
    // if (role) {
    //     //está com role nos cookies então está autenticado - obs: usar um metodo para garantir autenticação real
    //     if (unsignedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    //         return NextResponse.redirect(backHome);
    //     } else {
    //         console.log("ROLE DO USUARIO FOI: ", role)
    //         if (role === USER_ROLES.STUDENT) {
    //             if (studentPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    //                 console.log(role + ' AUTORIZADO em ' + req.nextUrl.pathname);
    //                 return NextResponse.next();
    //             }
    //             console.log(role + ' NÃO autorizado em ' + req.nextUrl.pathname);
    //             return NextResponse.redirect(backHome);
    //         } else if (role === USER_ROLES.PROFESSOR) {
    //             if (professorPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    //                 console.log(role + ' AUTORIZADO em ' + req.nextUrl.pathname);
    //                 return NextResponse.next();
    //             }
    //             console.log(role + ' NÃO autorizado em ' + req.nextUrl.pathname);
    //             return NextResponse.redirect(backHome);
    //         } else if (role === USER_ROLES.TECH_MANAGER) {
    //             if (techManagerPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    //                 console.log(role + ' AUTORIZADO em ' + req.nextUrl.pathname);
    //                 return NextResponse.next();
    //             }
    //             console.log(role + ' NÃO autorizado em ' + req.nextUrl.pathname);
    //             return NextResponse.redirect(backHome); // é redirecionado para a home
    //         } else if (role === USER_ROLES.ADMIN) {
    //             if (adminPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    //                 console.log(role + ' AUTORIZADO em ' + req.nextUrl.pathname);
    //                 return NextResponse.next();
    //             }
    //             console.log(role + ' NÃO autorizado em ' + req.nextUrl.pathname);
    //             return NextResponse.redirect(backHome); // é redirecionado para a home
    //         } else {
    //             console.log('Usuario com role indeterminada!');
    //             if (unsignedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    //                 return NextResponse.next();
    //             } else {
    //                 return NextResponse.redirect(backLogin);
    //             }
    //         }
    //     }
    // } else {
    //     console.log('Usuario nao autenticado');
    //     if (unsignedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    //         return NextResponse.next();
    //     } else {
    //         return NextResponse.redirect(backLogin);
    //     }
    // }
}
export const config = {
    matcher: [
        '/article-screen/:path*',
        '/article-submission/:path*',
        '/articles-assignment/:path*',
        '/authorities-assignment/:path*',
        '/create-event/:path*',
        '/review-screen/:path*',
        '/event-screen/:path*',
        '/home',
        '/login',
        '/manage-event/:path*',
        '/published-articles/:path*',
        '/published-reviews/:path*',
        '/register',
        '/user-profile/:path*',
    ],
};
