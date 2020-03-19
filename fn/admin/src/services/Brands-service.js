import AdminService from './Admin-service';

class BrandsService extends AdminService {
    getAllBrands = async () => {
        const brands = await this.getResource('brands');
        return brands;
    };
}

const brandsService = new BrandsService();

export default brandsService;
