import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Team Member Interface
export interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  imageUrl: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

// Statistic Interface
export interface Statistic {
  id: number;
  number: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AboutusComponent implements OnInit {
  
  // Statistics data
  statistics: Statistic[] = [
    {
      id: 1,
      number: '500+',
      label: 'مکان‌های دیدنی',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
    },
    {
      id: 2,
      number: '50+',
      label: 'کشور جهان',
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 919-9'
    },
    {
      id: 3,
      number: '100K+',
      label: 'کاربر فعال',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239'
    },
    {
      id: 4,
      number: '24/7',
      label: 'پشتیبانی آنلاین',
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z'
    }
  ];

  // Team members data
  teamMembers: TeamMember[] = [
    {
      id: 1,
      name: ' سید امیر احسانی',
      position: 'توسعه دهنده،ایده پرداز و صاحب امتیاز',
      description: 'من امیر احسانی سازنده،طراح و برنامه نویس این نرم افزار هستم. در حال حاضر مهندس نرم افزار در ایران خودرو',
      imageUrl: 'images/me3.jpg',
      socialLinks: {
        linkedin: '#',
        twitter: '#',
        instagram: '#'
      }
    },
   
    // {
    //   id: 3,
    //   name: 'محمد رضایی',
    //   position: 'مدیر فنی و توسعه',
    //   description: 'محمد مهندس نرم‌افزار با تخصص در توسعه وب است. او مسئول طراحی و توسعه پلتفرم ما می‌باشد.',
    //   imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    //   socialLinks: {
    //     linkedin: '#',
    //     twitter: '#'
    //   }
    // },
    // {
    //   id: 4,
    //   name: 'زهرا موسوی',
    //   position: 'مدیر طراحی و تجربه کاربری',
    //   description: 'زهرا طراح گرافیک و UX با سال‌ها تجربه است. او مسئول طراحی رابط کاربری زیبا و کاربردی ما می‌باشد.',
    //   imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    //   socialLinks: {
    //     linkedin: '#',
    //     instagram: '#'
    //   }
    // }
  ];

  // Values data
  values = [
    {
      id: 1,
      title: 'کیفیت محتوا',
      description: 'ما متعهد به ارائه اطلاعات دقیق، کامل و به‌روز درباره مکان‌های گردشگری هستیم.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      id: 2,
      title: 'تجربه کاربری عالی',
      description: 'طراحی ساده، زیبا و کاربردی برای بهترین تجربه جستجو و کشف مکان‌های جدید.',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
    },
    {
      id: 3,
      title: 'پشتیبانی مستمر',
      description: 'تیم پشتیبانی ما همیشه آماده کمک و راهنمایی شما در سفرهای خاطره‌انگیز است.',
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z'
    },
    {
      id: 4,
      title: 'نوآوری مستمر',
      description: 'همیشه در حال بهبود و اضافه کردن ویژگی‌های جدید برای تجربه بهتر کاربران هستیم.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize any animations or dynamic content here
  }

  // Track by functions for performance
  trackByStatId(index: number, stat: Statistic): number {
    return stat.id;
  }

  trackByMemberId(index: number, member: TeamMember): number {
    return member.id;
  }

  trackByValueId(index: number, value: any): number {
    return value.id;
  }
}