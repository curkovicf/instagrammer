import { Component } from '@angular/core';

interface FooterMenuItem {
  title: string;
  url?: string;
}

@Component({
  selector: 'ng-inst-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public itemsFirstRow: FooterMenuItem[] = [
    { title: 'Meta', url: 'https://about.facebook.com/meta' },
    { title: 'About', url: 'https://about.instagram.com/' },
    { title: 'Blog', url: 'https://about.instagram.com/blog' },
    { title: 'Jobs', url: 'https://www.instagram.com/about/jobs/' },
    { title: 'Help', url: 'https://help.instagram.com/' },
    { title: 'Privacy', url: 'https://www.instagram.com/legal/privacy/' },
    { title: 'Terms', url: 'https://www.instagram.com/legal/terms/' },
    { title: 'Top Accounts', url: 'https://www.instagram.com/directory/profiles/' },
    { title: 'HashTags', url: 'https://www.instagram.com/directory/hashtags/' },
    { title: 'Locations', url: 'https://www.instagram.com/explore/locations/' },
    { title: 'Instagram Lite', url: 'https://www.instagram.com/web/lite/' },
  ];

  public itemsSecondRow: FooterMenuItem[] = [
    { title: 'Dance', url: 'https://www.instagram.com/topics/dance-and-performance/' },
    { title: 'Food & Drink', url: 'https://www.instagram.com/topics/food-and-drink/' },
    { title: 'Home & Garden', url: 'https://www.instagram.com/topics/home-and-garden/' },
    { title: 'Music', url: 'https://www.instagram.com/topics/music/' },
    { title: 'Visual Arts', url: 'https://www.instagram.com/topics/visual-arts/' },
  ];

  public itemsThirdRow: FooterMenuItem[] = [{ title: '© 2022 Instagram from Meta' }];
}
