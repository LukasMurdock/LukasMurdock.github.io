---
layout: post
title: 'RIP iTunes'
description: ""
date: April 7, 2021
last_modified_at: 	2021-04-07T19:43:08+0000
---

TL;DR Full iOS backups used to include apps you purchased–so you could restore apps from a backup even if Apple removed them from the App Store–because that’s what having a backup was for. Apple now says, “just redownload the app–oh wait, the app no longer exists? Haha, fuck you.”

I’ve been out of the iOS dev scene for a few years now. And the death of iTunes is just now hitting as I’m looking to update to the new iPhone 12. Thanks to various decisions made inside Apple, I’ve never been unhappier to get a new electronic.

I am happy to get my sweet, sweet iPhone 5s body back (oh, how I’ve missed you). I’m not happy to lose TouchID (hopefully, it’ll make a comeback). I’m not happy to have to re-auth tons of apps. I’m not happy that the control center is gone from the bottom. I’m not happy that the battery percentage is no longer capable of being shown by default. And I’m not happy to see that Apple has removed the ability to backup apps…

For posterity: as of April 7, 2021 I had 405 apps installed on my iPhone 8.



## Backing up Apps

Before iTunes 12.7 ([Released September 12, 2017](https://en.wikipedia.org/wiki/History_of_iTunes#iTunes_12)), iTunes had a built-in App Store browser.

This was one of the reasons I always backed up my iPhone to my Mac. Before iTunes 12.7, if I had an app on my phone and Apple removed it from the App Store, I could back up my phone and move to a new phone and still have that app–even if it was no longer in the App Store.

After iTunes 12.7, Apple removed that ability. [Apple now blocks iOS app backups](https://appleinsider.com/articles/18/10/03/apple-now-blocks-ios-app-backups-but-you-can-do-something-about-it).

They released an additional iTunes 12.6.5 that had a built-in App Store browser and left a short window where you could use it before stopping any of that goodness.

---

Wait! Maybe I can install iTunes 12.6.5 on an old Windows computer and it can back up the phone apps? ([H/T to u/Creative-Bullfrog](https://www.reddit.com/r/sideloaded/comments/k15zds/guide_you_can_download_ipa_files_with_apple/gdncyi7))

Maybe [updating apps from iTunes 12.6.5 doesn’t work](https://discussions.apple.com/thread/251200031?page=2)? But it might just not work on Macs.

[The backup button might be greyed out for modern iOS versions in iTunes 12.6.5 on Windows](https://discussions.apple.com/thread/251517547).

[iTunes 12.6.5.3 may possibly still work on Windows 7](https://discussions.apple.com/thread/251389293).

[Download links for old versions of iTunes](https://www.lifewire.com/download-every-version-itunes-2000446#mntl-sc-block_1-0-19).

---

The last survivor seems to be Apple Configurator 2. A free app from Apple to [configure one or dozens of iPhone and iPad devices connected to a Mac through USB](https://support.apple.com/guide/deployment-reference-ios/apple-configurator-2-ior5761b421e/web).

> With Apple Configurator 2, you’re able to update software, install apps and configuration profiles, rename and change wallpaper on devices, export device information and documents, and much more. You can also use it to restore devices from a backup.

Great! You can download .ipa files with Apple configurator 2, but only if they’re in the App Store… So, not great.

But here’s a [potential work around](https://apple.stackexchange.com/questions/298391/how-do-i-download-an-ios-app-ipa-file-to-my-mac-after-itunes-12-7-update):
1. Open finder
2. `Command + Shift + . (period)` to view hidden files
3. Go to folder `~/Library/Group Containers/K36BKF7T3D.group.com.apple.configurator/Library/Caches/Assets/TemporaryItems/MobileApps` (likely empty)
4. Install Apple Configurator 2 from Mac App Store
5. Connect iPhone
6. Click `add`
7. Add from computer (hopefully you can find .ipa online)
8. When it prompts that you already have the app installed, a folder should appear in Finder (keep opening folders until you see the ipa)
9. Quickly copy and paste the ipa somewhere else on your computer

I feel like this just gets you the same ipa that you put in… Which is not what I need.

So this leaves Third Party Tools to hopefully achieve that glorious full backup.

The Internet tells me there are two popular tools:
- [iMazing](https://imazing.com/backup-iphone-ipad) (costs $44.99)
- 3uTools (free, but windows-only)

https://www.lifewire.com/install-apps-removed-from-app-store-2000636

So I dusted off an old Surface tablet and installed 3uTools.

Waited over 2 hours for the backup to finish and…

It tells me “No related resources were found” for the apps that are no longer on the App Store.

So now lets try that iTunes 12.6.5 on Windows… and even after getting through a bunch of error messages, no luck.

So I installed iMazing on my 2012 MBP and backed up only apps–took around 30 minutes.

iMazing has a guide to [Manage and Download Apps (.ipa) without iTunes](https://imazing.com/guides/how-to-manage-apps-without-itunes).

It took me way too long to figure out that the UI view in iMazing for exporting an IPA `Manage Apps > Library` is no longer the default–I had to click Library…

And because I didn’t realize this I purchased a license for iMazing when this might be a feature on the free tier. BUT IT WORKED SO I’M NOT EVEN MAD.

1. Plugging in my old iPhone 8
2. `Manage Apps > Library` > Right click `Export .ipa`
3. Plug in new phone
4. Import .ipa file
5. Bam


## When you can’t backup and restore an app… sideload 

I recently [sideloaded a jailbroken iPhone 5](https://lukasmurdock.com/sideloading-iphone-5/), but sideloading on modern non-jailbroken phones currently means re-sideloading every week.

This is because “sideloading” was introduced in iOS 9 as a developer feature for testing purposes. Developers can install a provisional profile and test apps on an iOS device for seven days (and up to 3 concurrent apps). The app works for seven days and requires reinstall/re-codesign afterward.

Tools:
- Xcode: open the Devices and Simulators window and select your device on the left, you can drag a .ipa to the Installed Apps list.
- Apple Configurator 2 — drag the .ipa to the device in the All Devices window.
- Cydia Impactor (now defunct)
- nullximpactor 
- AltStore

You may be wondering, “why would you use these other tools if you can do it with Xcode, an Apple-provided app?” And the answer is: because Xcode takes up a ton of space–at the moment, Xcode and its simulators are using just over 90GB.

With Xcode 7, [you no longer need a paid membership to run apps distributed outside the App Store](https://stackoverflow.com/a/4952845/12161293). 

Again, regardless of how you provision, it will only be valid for seven days, after which you’ll need to repeat the process.

Also, [you can Sideload iOS/iPadOS Apps on M1 Macs](https://paulsolin.com/2020/12/30/sideloading-ios-ipados-apps-on-your-m1-mac/).



