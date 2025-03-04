const db = require("../database/dbContext");

class profileRepository
{
    constructor(db)
    {
        this.Users = db.Users;

        this.Tokenz = db.Tokenz;

        this.User_customization = db.User_customization;
    }

    async getUserAndCustomization(id) {
        try {
            const userWithCustomization = await this.Users.findOne({
                where: { id: id },
                include: [{
                    model: this.User_customization,
                    required: true,
                }],
            });
            if (userWithCustomization && userWithCustomization.User_customization) {
                const profileProfPicBuffer = userWithCustomization.User_customization.profil_picture;
                const profileBackPicBuffer = userWithCustomization.User_customization.background_picture;
            
                const profileProfPicMimeType = userWithCustomization.User_customization.profil_picture_type || 'image/jpeg'; // Alapértelmezett MIME típus
                const profileBackPicMimeType = userWithCustomization.User_customization.background_picture_type || 'image/jpeg'; // Alapértelmezett MIME típus

                if (profileProfPicBuffer) {
                    // Blob fájl átalakítása Base64 formátumba
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    userWithCustomization.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            
                if (profileBackPicBuffer) {
                    // Blob fájl átalakítása Base64 formátumba
                    const base64Image = Buffer.from(profileBackPicBuffer).toString('base64');
                    userWithCustomization.User_customization.background_picture = `data:${profileBackPicMimeType};base64,${base64Image}`;
                }
            }

            return userWithCustomization;
        } catch (error) {
            console.error('Hiba történt a felhasználó és a testreszabás lekérése során:', error);
            throw error;
        }
    }

    async ProfPicUpload(id, blob, type, mimeType)
    {
        try {
            const user = await this.User_customization.findOne({
                where: {
                    user_id: id,
                }
            });
            if (!user) {
                throw new Error("Felhasználó nem található!");
            }

            if(type == '0'){
                user.profil_picture = blob;
                user.profil_picture_type = mimeType;
            }else if(type == '1'){
                user.background_picture = blob;
                user.background_picture_type = mimeType;
            }
            await user.save();
    
            return { success: true, message: "Profilkép sikeresen frissítve!"};
        } catch (error) {
            console.error("Hiba történt a profilkép frissítésekor:", error);
            return { success: false, message: "Hiba történt a profilkép frissítésekor!", error };
        }
    }

    async DarkmodeUpload(id, darkmode){
        const User = await this.User_customization.findOne({
            where: {
                user_id: id
            }
        });

        User.darkmode = darkmode; 

        await User.save();

        return "Felhasználónak firssült a kinézet!";
    }

    async getElseUserById(id){
        try {
            const userWithCustomization = await this.Users.findOne({
                where: { id: id },
                include: [{
                    model: this.User_customization,
                    required: true,
                }],
            });
            if (userWithCustomization && userWithCustomization.User_customization) {
                const profileProfPicBuffer = userWithCustomization.User_customization.profil_picture;
                const profileBackPicBuffer = userWithCustomization.User_customization.background_picture;
            
                const profileProfPicMimeType = userWithCustomization.User_customization.profil_picture_type || 'image/jpeg'; // Alapértelmezett MIME típus
                const profileBackPicMimeType = userWithCustomization.User_customization.background_picture_type || 'image/jpeg'; // Alapértelmezett MIME típus

                if (profileProfPicBuffer) {
                    // Blob fájl átalakítása Base64 formátumba
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    userWithCustomization.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            
                if (profileBackPicBuffer) {
                    // Blob fájl átalakítása Base64 formátumba
                    const base64Image = Buffer.from(profileBackPicBuffer).toString('base64');
                    userWithCustomization.User_customization.background_picture = `data:${profileBackPicMimeType};base64,${base64Image}`;
                }
            }

            const else_user = {
                name: userWithCustomization.user_name,
                experience_point: userWithCustomization.experience_point,
                user_role: userWithCustomization.user_role,
                join_date: userWithCustomization.join_date,
                profil_picture: userWithCustomization.User_customization.profil_picture,
                background_picture: userWithCustomization.User_customization.background_picture,
                darkmode: userWithCustomization.User_customization.darkmode
            };

            return else_user;
        } catch (error) {
            console.error('Hiba történt a felhasználó és a testreszabás lekérése során:', error);
            throw error;
        }
    }

}

module.exports = new profileRepository(db);