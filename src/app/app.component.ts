import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    _text = 'test'
    title = 'ng-trix';
    entitiesTypes = [
        {
            name: 'first',
            background_color: '#209cee',
            // text_color: '#ffffff',
        },
        {
            name: 'last',
            // background_color: '#ffcc00',
            // text_color: '#333333',
        },
        {
            name: 'prefix',
            // background_color: '#333333',
            // text_color: '#ffffff',
        },
        {
            name: 'address',
            // background_color: '#33cc99',
            // text_color: '#ffffff',
        },
        {
            name: 'phones',
            // background_color: '#ff3333',
            // text_color: '#ffffff',
        },
        {
            name: 'emails',
            // background_color: '#9933ff',
            // text_color: '#ffffff',
        },
    ]
    positions = [
        {
            id: 'E1',
            prob: 0,
            start_offset: 7,
            end_offset: 14,
            entity_id: '1',
            recordIds: 'R1',
            relationsIds: ''
        }
    ]
    text = `<section class="banner-padding-section">
<div class="extra-large-wrapper center">
<div class="leadership-overlay"></div>
<h2 class="h1">Executive Leadership</h2>
<ul class="four-column-list margin-top-long" id="executive-leadership-list">
<li>
<a href="/about/henry-schuck" class="shadow-box link no-padding">
<div class="leadership-image">
<img src="https://www.zoominfo.com/wp-content/uploads/2020/06/schuck.png" alt="" class="lazyloaded" data-ll-status="loaded"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/schuck.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Henry Schuck</div>
<div class="paragraph-text small">Co-Founder &amp; Chief Executive Officer</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Learn More</div>
</div>
</div>
</a>
</li>
<li class="modal" data-count="1">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="https://www.zoominfo.com/wp-content/uploads/2020/11/cameron-leadership.png" alt="" class="lazyloaded" data-ll-status="loaded"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/11/cameron-leadership.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Cameron Hyzer</div>
<div class="paragraph-text small">Chief Financial Officer</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="2">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="https://www.zoominfo.com/wp-content/uploads/2020/06/hays.png" alt="" class="lazyloaded" data-ll-status="loaded"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/hays.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Chris Hays</div>
<div class="paragraph-text small">Chief Operating Officer</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="3">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="https://www.zoominfo.com/wp-content/uploads/2020/06/nir.png" alt="" class="lazyloaded" data-ll-status="loaded"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/nir.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Hila Nir</div>
<div class="paragraph-text small">Chief Product Officer</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="4">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="https://www.zoominfo.com/wp-content/uploads/2020/06/keren.png" alt="" class="lazyloaded" data-ll-status="loaded"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/keren.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Nir Keren</div>
<div class="paragraph-text small">Chief Technology Officer</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="5">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="https://www.zoominfo.com/wp-content/uploads/2020/06/alyssa.png" alt="" class="lazyloaded" data-ll-status="loaded"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/alyssa.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Alyssa Lahar</div>
<div class="paragraph-text small">Chief Human Resources Officer</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="6">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="https://www.zoominfo.com/wp-content/uploads/2020/06/stark.png" alt="" class="lazyloaded" data-ll-status="loaded"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/stark.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Anthony Stark</div>
<div class="paragraph-text small">General Counsel</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="7">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="https://www.zoominfo.com/wp-content/uploads/2021/02/shane-leadership.png" alt="" class="lazyloaded" data-ll-status="loaded"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2021/02/shane-leadership.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Shane Murphy-Reuter</div>
<div class="paragraph-text small">Chief Marketing Officer</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
</ul>
<div class="fixed-leadership-drop-down shadow-box exec-drop-down">
<button class="close-button"></button>
<div class="relative left">
<div class="leadership-content-wrapper executive-content-wrapper" id="1">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/11/cameron-leadership.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/11/cameron-leadership.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Cameron Hyzer</div>
<a href="https://www.linkedin.com/in/cameron-hyzer-88710/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Chief Financial Officer</div>
<div class="paragraph-text"><p>As Chief Financial Officer since 2018, Cameron brings over 20 years of SaaS, software, and strategic acquisition experience to ZoomInfo. Prior to joining ZoomInfo in 2018, he served as the Chief Financial Officer and an Executive Managing Director of Eze Software Group LLC, a global provider of order management and investment technology to hedge funds and asset managers, from 2013 to 2018 through its sale to SS&amp;C Technologies, Inc.<br>
<br>
He also served as Managing Director, Controller, and Treasurer of ConvergEx Group, a provider of global agency brokerage and investment technology, and Eze’s parent company, from 2007 to 2013 and Vice President of Finance at Eze Castle Software from 2005 to 2007.<br>
<br>
Earlier in his career, he served in executive and financial roles at other software and information companies, including Thomson Financial and Cramer Systems, and started his career in investment banking and private equity at Broadview International LLC and Broadview Capital Partners, LLC.<br>
<br>
He holds a B.S. in Economics, cum laude, from the University of Pennsylvania Wharton School and a B.S. in Electrical Engineering, cum laude, from the University of Pennsylvania School of Engineering and Applied Science. He is also a Chartered Financial Analyst charterholder.<br>
<br>
A Chicago Cubs fan, he and his wife have three children, a Bernese mountain dog, two labrador retrievers, 12 koi fish, and enjoy traveling (especially to their favorite vacation destination: St. John).</p>
</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper executive-content-wrapper open" id="2">
<div class="leadership-image modal">
<img src="https://www.zoominfo.com/wp-content/uploads/2020/06/hays.png" alt="" class="lazyloaded" data-ll-status="loaded"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/hays.png" alt=""></noscript>
</div>
<div>
 <div class="leadership-text-area">
<div class="h3">Chris Hays</div>
<a href="https://www.linkedin.com/in/chrishays1/" class="linkedin-icon" target="_blank">
<img src="/wp-content/themes/about/images/linkedin-icon.svg" alt="" class="lazyloaded" data-ll-status="loaded"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Chief Operating Officer</div>
<div class="paragraph-text"><p>Chris Hays leads sales, marketing, and customer success as Chief Operating Officer. From 2019 until early 2021, Chris helmed our sales and customer success teams as Chief Revenue Officer. Prior to that, from 2016 to 2019, he served as Senior Director of Sales and Marketing Operations, Vice President of Sales Operations, and Chief Operating Officer.<br>
<br>
Prior to ZoomInfo, he leveraged over 20 years of business-to-business experience managing high-performing, go-to-market teams, including global sales, marketing, and operations roles at Lucent, and later at Avaya, to eventually co-founding Inside Sales Team in 2008. At Inside Sales Team, he also served as Head of Revenue Operations until 2015. He holds a B.A. from SUNY-Albany.</p>
</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper executive-content-wrapper" id="3">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/nir.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/nir.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Hila Nir</div>
<a href="https://www.linkedin.com/in/hila-nir-226851b/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Chief Product Officer</div>
<div class="paragraph-text"><p>Hila serves as Chief Product Officer, overseeing our product strategy and vision to create new solutions to automate the entire go-to-market motion. Her responsibilities encompass product management, product marketing, product business intelligence, product operations, and product design.<br>
<br>
Prior to Hila’s role as Chief Product Officer, she served as Chief Marketing Officer, where she led our marketing team, including the marketing strategy for our IPO. She successfully positioned the ZoomInfo brand as a market leader, driving significant growth in website traffic, marketing leads, and inbound new sales.<br>
<br>
Hila also served as Vice President of Product and Director of Marketing. Before joining ZoomInfo in 2011 and moving to the U.S. in 2018, she held various financial-services roles at Brooks-Keret, Giza Singer Even, and E&amp;Y in Israel.<br>
<br>
A Certified Public Accountant, Hila combines analytics and creativity to create results- and data-driven marketing strategies. She holds her M.A. in Economics from Bar-Ilan University in Israel and a B.A. in Accounting and Economics from The Hebrew University of Jerusalem.<br>
<br>
A mother of three children, Hila and her family live outside of the Boston area and have a black Labrador named Forest. She and her family enjoy traveling, and since moving to the U.S., they’ve visited Alaska, Hawaii, and the Galapagos Islands.</p>
</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper executive-content-wrapper" id="4">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/keren.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/keren.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Nir Keren</div>
<a href="https://www.linkedin.com/in/nir-keren/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Chief Technology Officer</div>
<div class="paragraph-text"><p>As Chief Technology Officer, Nir has been the driving force behind our data-driven, technological innovation since 2015.<br>
<br>
An entrepreneur at heart, he was the Founder and Chief Technology Officer of AdSAP, an all-in-one online advertising platform, as well as the Founder and Chief Technology Officer of ONDiGO, a sales automation platform. Prior to that, he served as an embedded software engineer at Ceragon Networks in Tel Aviv.<br>
<br>
Nir holds a B.S. in Electrical and Computer Engineering from Ben-Gurion University in Israel. He met his wife in the Israeli army, and they have three children. He enjoys cooking, reality TV shows, and shopping.</p>
</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper executive-content-wrapper" id="5">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/alyssa.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/alyssa.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Alyssa Lahar</div>
<a href="https://www.linkedin.com/in/alyssa-lahar-3400b77b/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Chief Human Resources Officer</div>
<div class="paragraph-text"><p>As Chief Human Resources Officer, Alyssa is responsible for progressing our award-winning company culture and leading our human resources sector.<br>
<br>
With over two decades of high-growth human resource experience, she is entrusted with overseeing our talent, training, and professional development, and effectively aligning internal teams with business strategies.<br>
<br>
She joined ZoomInfo in 2019 following nearly 20 years at Dell EMC, where she rose to Vice President of Human Resources in Dell’s Storage Division and supported the $12-billion organization’s more than 6,000 employees.<br>
<br>
She holds a B.A. in Marketing and Communications from Bryant University in Rhode Island. A Boston-area native, she and her husband, John, have three sons, all of them basketball players. The family enjoys skiing, attending New England Patriots games, and traveling.</p>
</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper executive-content-wrapper" id="6">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/stark.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/stark.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Anthony Stark</div>
<a href="https://www.linkedin.com/in/anthony-stark-8372149/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">General Counsel</div>
<div class="paragraph-text"><p>As ZoomInfo’s General Counsel, Anthony oversees our legal, compliance, governance, and government relations functions. He joined ZoomInfo from Lane Powell in Portland, Oregon, after previously working in the New York offices of Latham &amp; Watkins and Baker Hostetler.<br>
<br>
He earned his J.D. from Cornell Law School and a B.S. in Computer Engineering from the University of Michigan. Prior to law school, he and his wife, Sarah, taught English in Japan for one year.<br>
<br>
The couple is originally from Michigan’s Upper Peninsula, and reside in the Portland area with their two young children. A movie buff and dabbling musician (piano and guitar), Anthony’s true passion is for Michigan Wolverines football and basketball.</p>
</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper executive-content-wrapper" id="7">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2021/02/shane-leadership.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2021/02/shane-leadership.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Shane Murphy-Reuter</div>
<a href="https://www.linkedin.com/in/shanemurfy/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Chief Marketing Officer</div>
<div class="paragraph-text"><p>Shane Murphy-Reuter joins ZoomInfo as Chief Marketing Officer from Intercom, a global customer messaging platform company, where he was SVP of Global Marketing. Prior to Intercom, he served as Vice President of North American Sales and Marketing at AdRoll, a growth marketing platform.</p>
</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
</div>
 </div>
</div>
</section>
<section class="short-top-padding-section">
<div class="medium-large-wrapper center" style="max-width: 56em;">
<h2 class="h1">Board Members</h2>
<ul class="three-column-list leadership margin-top-long justify-center" id="boardmembers-list">
<li>
<a href="/about/henry-schuck" class="shadow-box link no-padding">
<div class="leadership-image">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/schuck.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/schuck.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Henry Schuck</div>
<div class="paragraph-text small">Co-Founder &amp; Chief Executive Officer</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Learn More</div>
</div>
</div>
</a>
</li>
<li class="modal" data-count="100">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/crocket.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/crocket.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Todd Crockett</div>
<div class="paragraph-text small">Managing Director, TA Associates</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="101">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/dhruv.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/dhruv.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Mitesh Dhruv</div>
<div class="paragraph-text small">Chief Financial Officer of RingCentral</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="102">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/enright.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/enright.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Keith Enright</div>
<div class="paragraph-text small">Chief Privacy Officer, Google</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="103">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/evans.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/evans.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
 <div class="h4">Ashley Evans</div>
<div class="paragraph-text small">Principal, Carlyle Group, U.S. Buyout</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="104">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/mader.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/mader.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Mark Mader</div>
<div class="paragraph-text small">President and CEO of Smartsheet</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="105">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/mccarter.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/mccarter.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Patrick McCarter</div>
<div class="paragraph-text small">Managing Director &amp; Head of Carlyle Group, Global TMT</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="106">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/mironov.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/mironov.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Jason Mironov</div>
<div class="paragraph-text small">Managing Director, TA Associates</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
<li class="modal" data-count="107">
<div class="shadow-box link no-padding">
<div class="leadership-image">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/winn.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/winn.png" alt=""></noscript>
</div>
<div class="padding-wrapper flex-wrapper space-between column">
<div style="flex-grow: 1;">
<div class="h4">Randall Winn</div>
<div class="paragraph-text small">Managing Director, 22C Capital</div>
</div>
<div>
<div class="text-link arrow-right margin-top">Read Bio</div>
</div>
</div>
</div>
</li>
</ul>
<div class="fixed-leadership-drop-down shadow-box board-drop-down">
<button class="close-button"></button>
<div class="relative left">
<div class="leadership-content-wrapper board-content-wrapper" id="100">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/crocket.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/crocket.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Todd Crockett</div>
<a href="https://www.linkedin.com/in/todd-crockett-ab1a482/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Managing Director, TA Associates</div>
<div class="paragraph-text">Todd Crockett is a managing director at global growth equity firm, TA Associates. He is active in the firm's investment activities in North America and focuses primarily on technology enabled services. His current board directorships and investments include ZoomInfo, Orion Advisor Solutions, Procare Software, Russell Investments, and Wealth Enhancement Group. He was also on the board of 2nd Story Software (acquired by TaxAct) and American Access Care (acquired by Fresenius Medical). A native of the Pacific Northwest, Todd grew up in Seattle and received his BA from Princeton University and an MBA from Harvard Business School.</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper board-content-wrapper" id="101">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/dhruv.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/dhruv.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Mitesh Dhruv</div>
<a href="https://www.linkedin.com/in/mitesh-dhruv-4b911b3/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Chief Financial Officer of RingCentral</div>
<div class="paragraph-text">With close to 20 years of experience in accounting and finance, including a career on Wall Street as an equity analyst, Mitesh is a reputed leader in the SaaS community. He was recently named Best Software CFO in Institutional Investor’s 2020 All-America Executive Team. Mitesh held a leadership role throughout RingCentral’s 2013 IPO and has scaled RingCentral (NYSE: RNG) to be a $1B revenue run rate business, from approximately $100 million when he joined in 2012. Under his leadership, RingCentral has been named a leader in the Unified Communications as a Service (UCaaS) industry by prominent analyst firms, including Gartner, Frost &amp; Sullivan, and IHS Markit. Previously, Mitesh was at PriceWaterhouseCoopers and Bank of America-Merrill Lynch, where he provided research coverage for software companies, including companies like Microsoft, Oracle, and Salesforce, and worked on several multi-billion-dollar IPOs.</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper board-content-wrapper" id="102">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/enright.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/enright.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Keith Enright</div>
<a href="https://www.linkedin.com/in/keithenright/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Chief Privacy Officer, Google</div>
<div class="paragraph-text">As Google’s (Nasdaq: GOOGL) Chief Privacy Officer, Keith leads the internet giant’s global privacy legal team. For decades, he has counseled early-stage startups, global consulting firms, and large multinational enterprises on data governance and data protection. Prior to joining Google, Keith served as Macy’s, Inc.’s first Chief Privacy Officer and Vice President, Privacy. Previously, he served as Chief Privacy Officer and Director of Enterprise Information Policy at Limited Brands, Inc., and as Senior Consultant and Privacy Technology Lead for the Public Sector Security, Privacy, and Wireless practice at IBM Business Consulting Services. He is a renowned speaker on online privacy and served a five year term on the Board of Directors of the International Association of Privacy Professionals. Keith holds a Bachelor’s Degree from the University of Massachusetts, Amherst and a Juris Doctorate from The George Washington University Law School.</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper board-content-wrapper" id="103">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/evans.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/evans.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Ashley Evans</div>
<a href="https://www.linkedin.com/in/ashleyevans/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Principal, Carlyle Group, U.S. Buyout</div>
<div class="paragraph-text">Ashley S. Evans is a Principal in the Technology, Media, and Telecom group based in Menlo Park. She primarily focuses on buyout and growth equity investments in enterprise software businesses.
Ms. Evans is currently a member of the boards of HireVue, ZoomInfo (f.k.a. DiscoverOrg) and Veritas. Since joining Carlyle (Nasdaq: CG) in 2006, she has also been involved in the firm’s prior investments in Kinder Morgan (NYSE: KMI), PQ (sold to CCMP) and Veyance (sold to Continental). Prior to joining Carlyle, she worked at Morgan Stanley, where she focused on financial institutions banking.
Ms. Evans received her MBA from Stanford University’s Graduate School of Business, where she was a Siebel Scholar and an Arjay Miller Scholar, an MPhil from Cambridge University, where she was a Knox Scholar, and an AB summa cum laude from Harvard College, where she was elected to Phi Beta Kappa.</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
 <div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper board-content-wrapper" id="104">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/mader.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/mader.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Mark Mader</div>
<a href="https://www.linkedin.com/in/markmader/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">President and CEO of Smartsheet</div>
<div class="paragraph-text">With over 20 years executive leadership experience driving innovation for high-growth Software-as-a-Service (SaaS) companies, Mark is a recognized leader in the technology community, including leading Smartsheet (NYSE: SMAR) through its 2018 IPO. He has been named Ernst &amp; Young’s Entrepreneur of the Year in Technology for the Pacific Northwest, and in 2019 was named one of the Top Major US Company CEOs by Comparably. Under his leadership, Smartsheet was named Washington’s Best Workplace by the Puget Sound Business Journal, and Seattle’s Next Tech Titan by GeekWire. He also serves as a board member of the University of Washington Information School, one of the world’s top information science programs.</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper board-content-wrapper" id="105">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/mccarter.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/mccarter.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Patrick McCarter</div>
<a href="https://www.linkedin.com/in/patrick-mccarter-825242/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Managing Director &amp; Head of Carlyle Group, Global TMT</div>
<div class="paragraph-text">Patrick R. McCarter is a Managing Director and the Head of the Global Technology, Media and Telecommunications (“TMT”) group for The Carlyle Group (Nasdaq: CG). He focuses on buyout and growth equity investments in larger companies including software, business services, semiconductors, communications, systems and related distribution businesses. Mr. McCarter is currently a member of the Boards of Directors of ZoomInfo, CommScope (Nasdaq: COMM), Veritas, and Ampere Computing. Mr. McCarter received his B.S. with a double major in industrial engineering and economics from Northwestern University and an M.B.A. from the Harvard Business School.</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper board-content-wrapper" id="106">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/mironov.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/mironov.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Jason Mironov</div>
<a href="https://www.linkedin.com/in/jmironov/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Managing Director, TA Associates</div>
<div class="paragraph-text">Jason Mironov is a Managing Director in TA’s Menlo Park office, focusing on investments in business, financial, technology-enabled and other services companies in North America. He serves on the Board of Directors of Backstage, Benecon, Conservice, Procare Software and ZoomInfo (Nasdaq: ZI), and formerly served on the Board of Plusgrade. Prior to joining TA in 2012, Mr. Mironov was an Associate at Spectrum Equity Investors and also worked in the Investment Banking Division of JP Morgan, as well as at Technology Crossover Ventures. He received a BBA degree, with Distinction, from the University of Michigan, Stephen M. Ross School of Business and an MBA degree from the Harvard Business School.</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
<div class="leadership-content-wrapper board-content-wrapper" id="107">
<div class="leadership-image modal">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="https://www.zoominfo.com/wp-content/uploads/2020/06/winn.png"><noscript><img src="https://www.zoominfo.com/wp-content/uploads/2020/06/winn.png" alt=""></noscript>
</div>
<div>
<div class="leadership-text-area">
<div class="h3">Randall Winn</div>
<a href="https://www.linkedin.com/in/randall-winn-354bb029/" class="linkedin-icon" target="_blank">
<img src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" alt="" data-lazy-src="/wp-content/themes/about/images/linkedin-icon.svg"><noscript><img src="/wp-content/themes/about/images/linkedin-icon.svg" alt=""></noscript>
</a>
<div class="paragraph-text small">Managing Director, 22C Capital</div>
<div class="paragraph-text">Randall Winn currently serves as managing partner of 22C Capital and is Director of Viteos Fund Services and Merit Software and co-Chairman of Rho AI. Prior to founding 22C Capital, Winn was a co-managing partner and CEO of Capital IQ, a pioneer in the financial intelligence industry, which he managed from 1999 to 2011. Mr. Winn received an A.B. from the Woodrow Wilson School of Public and International Affairs at Princeton University.</div>
</div>
<div class="leadership-nav">
<div class="prev-tab text-link arrow-left">Previous</div>
<div class="next-tab text-link arrow-right">Next</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
    `;
    signature = 'Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2009, to January 20, 2017. A member of the Democratic Party, he was the first African American to serve as president. He was previously a United States Senator from Illinois and a member of the Illinois State Senate.Barack Hussein Obama II (born August 4, 1961) is an American attorney and politician who served as the 44th President of the United States from January 20, 2';

    constructor() {

    }

    ngOnInit(): void {

    }

    onSave(results) {
        console.log('results', results);
    }

    click() {
        this.positions = [
            {
                id: 'E1',
                prob: 0,
                start_offset: 7,
                end_offset: 14,
                entity_id: '1',
                recordIds: 'R1',
                relationsIds: ''
            }
        ];
        // this.entitiesTypes = [
        //     {
        //         name: 'first',
        //         // background_color: '#209cee',
        //         // text_color: '#ffffff',
        //     },
        //     {
        //         name: 'last',
        //         // background_color: '#ffcc00',
        //         // text_color: '#333333',
        //     },
        //     {
        //         name: 'prefix',
        //         // background_color: '#333333',
        //         // text_color: '#ffffff',
        //     },
        //     {
        //         name: 'address',
        //         // background_color: '#33cc99',
        //         // text_color: '#ffffff',
        //     },
        //     {
        //         name: 'phones',
        //         // background_color: '#ff3333',
        //         // text_color: '#ffffff',
        //     },
        //     {
        //         name: 'emails',
        //         // background_color: '#9933ff',
        //         // text_color: '#ffffff',
        //     },
        // ]
    }
}
