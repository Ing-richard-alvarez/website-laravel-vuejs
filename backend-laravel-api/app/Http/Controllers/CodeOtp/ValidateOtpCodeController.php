<?php

namespace App\Http\Controllers\CodeOtp;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class ValidateOtpCodeController extends Controller
{
    
    /**
     *  Send Otp Code
     */
    public function sendOtpCode(Request $request)
    {
        // Params of request to external api telesign
        $url = env("URL_API_TELESIGN_SENDOTP");
        $customerId = env("CUSTOMER_ID_TELESIGN");
        $apiKey = env("API_KEY_TELESIGN");
        $phone = $request->input("phone");
        
        // call api telesign using Basic Auth 
        $response = Http::withBasicAuth($customerId, $apiKey)->asForm()->post($url,['phone_number' => $phone]);
        $decodeResponse = $response->json();

        return response()->json([
            'phone' => $phone,
            'response' => $decodeResponse
        ]);
    }

    /**
     * Validate Otp Code
     */
    public function validateOtpCode(Request $request, string $reference_id, $verify_code)
    {
        $url = env("URL_API_TELESIGN_VALIDATEOTP");
        $customerId = env("CUSTOMER_ID_TELESIGN");
        $apiKey = env("API_KEY_TELESIGN");

        $isValid = false;

        $response = Http::withBasicAuth($customerId, $apiKey)->withUrlParameters([
            'endpoint' => $url,
            'reference_id' => $reference_id,
            'verify_code' => $verify_code,
        ])->get('{+endpoint}/{reference_id}?verify_code={verify_code}');

        $decodeResponse = $response->json();
        
        if ($decodeResponse !== null && 
            array_key_exists('verify', $decodeResponse) &&
            array_key_exists('code_state', $decodeResponse['verify'])
        )  {
            $isValid = ($decodeResponse['verify']['code_state'] == 'VALID')? true : false;
        }
        return response()->json([
            'originalResponse' => $decodeResponse,
            'isValid' => $isValid
        ]);

    }
}
