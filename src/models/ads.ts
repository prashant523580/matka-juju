import mongoose from "mongoose";
const adSchema = new mongoose.Schema({
    imageUrl:  {
      publicId: String,
      img: String,
    },
    title: String,
    description: String,
    targetUrl: String,
    position:String,
    page:String,
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  });
  
  adSchema.methods.incrementImpressions = async function () {
    this.impressions += 1;
    await this.save();
  };
  
  adSchema.methods.incrementClicks = async function () {
    this.clicks += 1;
    await this.save();
  };
  
export default mongoose.models.Ad || mongoose.model('Ad', adSchema);