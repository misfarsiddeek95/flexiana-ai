-- CreateTable
CREATE TABLE `SystemUserType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `permissions` TEXT NOT NULL DEFAULT '[]',
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SystemUserType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SystemUser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `userTypeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SystemUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `author` VARCHAR(191) NOT NULL,
    `authorImage` VARCHAR(191) NULL,
    `publishDate` DATETIME(3) NOT NULL,
    `readTime` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `imageAlt` VARCHAR(191) NULL,
    `tags` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `metaDescription` VARCHAR(191) NULL,
    `metaKeywords` TEXT NULL,
    `showInHome` BOOLEAN NOT NULL DEFAULT false,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Blog_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaseStudy` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,
    `client` VARCHAR(191) NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `heroImage` VARCHAR(191) NULL,
    `heroVideo` VARCHAR(191) NULL,
    `heroImageAlt` VARCHAR(191) NULL,
    `tags` TEXT NOT NULL,
    `overview` LONGTEXT NOT NULL,
    `challenge` LONGTEXT NOT NULL,
    `solution` LONGTEXT NOT NULL,
    `techStack` LONGTEXT NOT NULL,
    `results` LONGTEXT NOT NULL,
    `metaDescription` VARCHAR(191) NULL,
    `metaKeywords` TEXT NULL,
    `carouselData` LONGTEXT NULL,
    `showInHome` BOOLEAN NOT NULL DEFAULT false,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CaseStudy_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SystemUser` ADD CONSTRAINT `SystemUser_userTypeId_fkey` FOREIGN KEY (`userTypeId`) REFERENCES `SystemUserType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
