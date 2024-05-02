#include <iostream>
//#include <string.h>
using namespace std;

class Tiles 
{
    public:
    string brand = "";
    int size_h = 0;
    int size_w = 0;
    int price = 0;

    Tiles(string b, int h, int w, int price) {
        this->brand = b;
        this->size_h = h;
        this->size_w = w;
        this->price = price;
    }

    void getData() {
        cout << "Brand: " << this->brand << ", Heigth: " << size_h << ", Wight: " << size_w << ", Price: " << price << endl;
    }
};

int main(int args, char const *argv []) {
    
    string brand = "";
    int width = 0;
    int height = 0;
    int price = 0;

    cin >> width;
    cin >> height;
    cin >> brand;
    cin >> price;

    Tiles* tile = new Tiles(brand, height, width, price);
    tile->getData();
//    cout << "The end" << endl;

    return 0;
}